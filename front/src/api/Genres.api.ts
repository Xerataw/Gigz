import GigzFetcher from '../services/GigzFetcher';
import GigzResponse from '../types/GigzResponse';

export const fetchGenres = async (): Promise<GigzResponse<any>> => {
  return GigzFetcher.get('genres');
};

export default fetchGenres;
