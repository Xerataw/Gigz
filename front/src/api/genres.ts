import GigzFetcher from '../services/GigzFetcher';
import IGenre from '../types/IGenre';
import IGigzResponse from '../types/IGigzResponse';

export const getGenres = async (): Promise<IGigzResponse<IGenre[]>> => {
  return GigzFetcher.get('genres');
};
