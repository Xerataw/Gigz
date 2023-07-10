import GigzFetcher from '../services/GigzFetcher';
import GigzResponse from '../types/GigzResponse';

export interface Genre {
  name: string;
  color: string;
  id: string;
}

export const fetchGenres = async (): Promise<GigzResponse<Genre[]>> => {
  return GigzFetcher.get('genres', {}, {}, true);
};

export default fetchGenres;
