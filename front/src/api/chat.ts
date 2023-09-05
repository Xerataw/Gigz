import IChat from '../types/chat/IChat';
import IChatDetails from '../types/chat/IChatDetails';

import GigzFetcher from '../services/GigzFetcher';
import IConversationList from '../types/chat/IChat';

export const getConversations = async () => {
  return GigzFetcher.get<IConversationList>('me/conversations');
};

export const getChatById = async (id: number, page: number) => {
  return GigzFetcher.get<IChatDetails>(`me/conversations/${id}`, {
    page: page,
  });
};
