import GigzFetcher from '../services/GigzFetcher';
import IProfile from '../types/IProfile';

export const getFavorites = async () => {
  return GigzFetcher.get<IProfile[]>('hosts');
};
