export interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export interface CompletionOptions {
    maxTokens?: number;
    temperature?: number;
}

export interface AIProvider {
    stream(messages: Message[], onChunk: (text: string) => void, opts?: CompletionOptions): Promise<void>;
    complete(messages: Message[], opts?: CompletionOptions): Promise<string>;
}
