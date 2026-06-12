import * as vscode from 'vscode';

export async function checkOllamaSetup(context: vscode.ExtensionContext): Promise<void> {
    const config = vscode.workspace.getConfiguration('freebird');
    const backend = config.get<string>('backend', 'ollama');
    if (backend !== 'ollama') return;
    if (context.globalState.get<boolean>('ollamaPromptDismissed')) return;

    const url = config.get<string>('ollamaUrl', 'http://localhost:11434');
    if (await pingOllama(url)) return;

    const choice = await vscode.window.showInformationMessage(
        "Freebird uses Ollama (free, local AI) as its default backend, but it doesn't seem to be running.",
        'Download Ollama', 'Use a different backend', "Don't show again"
    );

    if (choice === 'Download Ollama') {
        vscode.env.openExternal(vscode.Uri.parse('https://ollama.com/download'));
    } else if (choice === 'Use a different backend') {
        vscode.commands.executeCommand('freebird.configure');
    } else if (choice === "Don't show again") {
        await context.globalState.update('ollamaPromptDismissed', true);
    }
}

async function pingOllama(url: string): Promise<boolean> {
    try {
        const res = await fetch(`${url}/api/tags`, { signal: AbortSignal.timeout(1500) });
        return res.ok;
    } catch {
        return false;
    }
}
