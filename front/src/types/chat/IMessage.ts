export default interface IMessage {
  id: number;
  senderId: number;
  recipientId: number;
  conversationId: number;
  content: string;
  sendDate: string;
  seen: number;
}
