export default interface IChat {
  id: number;
  profilePicture: string;
  unread: number;
  from: string;
  shortLastMessage: string;
  lastMessageDate: Date;
}
