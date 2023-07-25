export default interface IChat {
  id: number;
  profilePicture: string;
  unread: number;
  from: {
    id: number;
    name: string;
    profilePicture: {
      media: string | null;
    } | null;
  };
  latestMessage: {
    content: string;
    sendDate: string;
  };
}
