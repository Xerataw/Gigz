import GigzFetcher from '../services/GigzFetcher';
import IFilter from '../types/IFilter';
import IGigzResponse from '../types/IGigzResponse';
import IResult from '../types/IResult';

const ROUTE = 'me/favorites';

export const likeAccountById = (id: number): void => {
  GigzFetcher.post(ROUTE, { id });
};

export const deleteLikeAccountById = (id: number): void => {
  GigzFetcher.delete(`${ROUTE}/${id}`);
};

export const getFavorites = (filters: IFilter, page = 1) => {
  return new Promise<IGigzResponse<IResult>>((resolve, reject) => {
    GigzFetcher.get<IResult>(`${ROUTE}`, {
      ...filters,
      longitude: filters.location?.longitude,
      latitude: filters.location?.latitude,
      location: null,
      page,
    })
      .then((response) => {
        setTimeout(() => {
          resolve(response);
        }, 200);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
