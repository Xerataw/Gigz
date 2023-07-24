import IChat from '../types/IChat';
import GigzFetcher from '../services/GigzFetcher';

export const getChats = async () => {
  return GigzFetcher.get<IChat[]>('me/conversations');
};
