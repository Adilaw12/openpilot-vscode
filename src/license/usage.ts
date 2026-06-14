import * as vscode from 'vscode';

// Lets free users try the Pro agent (codebase reading, multi-file edits, etc.)
// a few times per month before nudging them to upgrade.
const TRIAL_KEY = 'freebird.agentTrialUsage';
export const AGENT_TRIAL_LIMIT = 5;

interface TrialUsage {
    month: string; // "YYYY-MM"
    count: number;
}

function currentMonth(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

function readUsage(context: vscode.ExtensionContext): TrialUsage {
    const stored = context.globalState.get<TrialUsage>(TRIAL_KEY);
    const month = currentMonth();
    if (!stored || stored.month !== month) {
        return { month, count: 0 };
    }
    return stored;
}

export function getAgentTrialRemaining(context: vscode.ExtensionContext): number {
    return Math.max(0, AGENT_TRIAL_LIMIT - readUsage(context).count);
}

// Records one trial use and returns the remaining count for this month.
export async function consumeAgentTrial(context: vscode.ExtensionContext): Promise<number> {
    const usage = readUsage(context);
    usage.count++;
    await context.globalState.update(TRIAL_KEY, usage);
    return Math.max(0, AGENT_TRIAL_LIMIT - usage.count);
}
