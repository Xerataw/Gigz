import GigzFetcher from '../services/GigzFetcher';

export const likeAccountById = (id: number): void => {
  GigzFetcher.post('me/favorites', { id });
};

export const deleteLikeAccountById = (id: number): void => {
  GigzFetcher.delete('me/favorites', { id: id });
};
