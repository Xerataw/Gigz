import IMessage from './IMessage';

export default interface IChatDetails {
  id: number;
  unreadMessages: number;
  latestMessageId: number;
  messages: IMessage[];
}
