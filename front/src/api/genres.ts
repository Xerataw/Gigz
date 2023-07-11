import GigzFetcher from '../services/GigzFetcher';
import IGigzResponse from '../types/IGigzResponse';

export const getGenres = async (): Promise<IGigzResponse<any>> => {
  return GigzFetcher.get('genres');
};

export default getGenres;
