import GigzFetcher from '../services/GigzFetcher';
import IGenre from '../types/IGenre';
import IGigzResponse from '../types/IGigzResponse';

export const getGenres = async (): Promise<IGigzResponse<IGenre[]>> => {
  return GigzFetcher.get<IGenre[]>('genres');
};

export const postGenre = async (
  genreId: number
): Promise<IGigzResponse<IGenre>> => {
  return GigzFetcher.post<IGenre>('me/genres', { genreId });
};
