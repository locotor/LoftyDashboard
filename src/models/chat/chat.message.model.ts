export class ChatMessage {
    MessageId: string;
    SenderSessionId: string; // 匿名游客sessionId
    MessageBody: string;
    SenderId: number;
    DateTime: Date;
    IsRead: boolean;
}