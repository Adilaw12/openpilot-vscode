import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

let _panel: vscode.WebviewPanel | undefined;
let _lastFile: string | undefined;
let _saveListener: vscode.Disposable | undefined;

// Opens (or reuses) a webview tab rendering the given HTML file. Relative
// <link>/<script>/<img> URLs are rewritten to webview URIs so local CSS/JS/images
// load correctly. Re-renders automatically whenever any file is saved, so editing
// the HTML/CSS and hitting save refreshes the preview — no Live Server needed.
export function previewHtmlFile(fullPath: string): void {
    if (!_panel) {
        const roots = (vscode.workspace.workspaceFolders ?? []).map(f => f.uri);
        _panel = vscode.window.createWebviewPanel(
            'freebird.preview',
            'Freebird Preview',
            vscode.ViewColumn.Beside,
            { enableScripts: true, retainContextWhenHidden: true, localResourceRoots: roots }
        );
        _panel.onDidDispose(() => {
            _panel = undefined;
            _lastFile = undefined;
            _saveListener?.dispose();
            _saveListener = undefined;
        });
        _saveListener = vscode.workspace.onDidSaveTextDocument(() => {
            if (_panel && _lastFile) render(_panel, _lastFile);
        });
    }

    _lastFile = fullPath;
    _panel.title = `Preview: ${path.basename(fullPath)}`;
    render(_panel, fullPath);
    _panel.reveal(vscode.ViewColumn.Beside, true);
}

function render(panel: vscode.WebviewPanel, fullPath: string): void {
    const html = fs.readFileSync(fullPath, 'utf8');
    const dir = vscode.Uri.file(path.dirname(fullPath));
    panel.webview.html = rewriteResourceUris(html, panel.webview, dir);
}

// Rewrites relative src/href attributes to webview-accessible URIs.
function rewriteResourceUris(html: string, webview: vscode.Webview, baseDir: vscode.Uri): string {
    return html.replace(/(src|href)=(["'])([^"']*)\2/gi, (match, attr, quote, relPath) => {
        if (!relPath || /^(https?:|\/\/|data:|#|mailto:|tel:|vscode-webview:)/i.test(relPath)) {
            return match;
        }
        try {
            const uri = webview.asWebviewUri(vscode.Uri.joinPath(baseDir, relPath));
            return `${attr}=${quote}${uri}${quote}`;
        } catch {
            return match;
        }
    });
}
