import GigzFetcher from '../services/GigzFetcher';
import IGigzResponse from '../types/IGigzResponse';
import IResult from '../types/IResult';

export const getAll = (): Promise<IGigzResponse<IResult[]>> => {
  return GigzFetcher.get<IResult[]>('me/favorites');
};

export const likeAccountById = (id: number): void => {
  GigzFetcher.post('me/favorites', { id });
};

export const deleteLikeAccountById = (id: number): void => {
  GigzFetcher.delete(`me/favorites/${id}`);
};
