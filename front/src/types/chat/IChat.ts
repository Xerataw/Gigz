export default interface IConversationList {
  artists: IConversation[];
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

export interface IConversationDetails {
  id: number;
  creatorId: number;
  memberId: number;
  latestMessageId: number;
  creationDate: string;
}
