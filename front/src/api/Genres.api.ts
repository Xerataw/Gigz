import GigzFetcher from '../services/GigzFetcher';
import { Genre } from '../types/Genre';
import GigzResponse from '../types/GigzResponse';

export const fetchGenres = async (): Promise<GigzResponse<Genre[]>> => {
  return GigzFetcher.get('genres', {}, {}, true);
};

export default fetchGenres;
