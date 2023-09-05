export default interface IConversationList {
  conversations: IConversation[];
  isLastPage: boolean;
}

export interface IConversation {
  id: number;
  profilePicture: string;
  unread: number;
  from: {
    id: number;
    name: string;
    profilePicture: string | null;
  };
  latestMessage: {
    content: string;
    sendDate: string;
  };
}
