export function stripFences(text: string): string {
    const match = text.trim().match(/^```[\w]*\n?([\s\S]*?)\n?```$/);
    return match ? match[1] : text;
}
