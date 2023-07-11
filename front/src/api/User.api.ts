import GigzFetcher from '../services/GigzFetcher';
import GigzResponse from '../types/GigzResponse';

export const getProfile = async (): Promise<GigzResponse<any>> => {
  return GigzFetcher.get('profiles');
};
