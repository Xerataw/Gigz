import GigzFetcher from '../services/GigzFetcher';
import IGigzResponse from '../types/IGigzResponse';

export const getProfile = async (): Promise<IGigzResponse<any>> => {
  return GigzFetcher.get('profiles');
};
