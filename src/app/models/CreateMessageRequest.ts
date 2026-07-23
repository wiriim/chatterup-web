export type CreateMessageRequest = {
    content: string;
    userId: number | string;
    chatId: number | string;
}