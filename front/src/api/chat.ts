import IChat from '../types/chat/IChat';
import IChatDetails from '../types/chat/IChatDetails';

import GigzFetcher from '../services/GigzFetcher';
import IMessage from '../types/chat/IMessage';

export const getChats = async () => {
  return GigzFetcher.get<IChat[]>('me/conversations');
};

export const getChatById = async (id: number, page: number) => {
  return GigzFetcher.get<IChatDetails>(`me/conversations/${id}`, {
    page: page,
  });
};

export const postMessage = async (conversationId: number, content: string) => {
  return GigzFetcher.post<IMessage>(`me/messages`, {
    conversationId,
    content,
  });
};
