import GigzFetcher from '../services/GigzFetcher';
import IArtistProfile from '../types/IArtistProfile';
import IFilter from '../types/IFilter';
import IGigzResponse from '../types/IGigzResponse';
import IHostProfile from '../types/IHostProfile';
import IResult from '../types/IResult';

export const getResults = (filters: IFilter, page = 1) => {
  return new Promise<IGigzResponse<IResult>>((resolve, reject) => {
    GigzFetcher.get<IResult>(`${filters.type}s`, {
      ...filters,
      longitude: filters.location?.longitude,
      latitude: filters.location?.latitude,
      location: null,
      type: null,
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

export const getProfileByIdAndType = async (
  id: number,
  isHost = true
): Promise<IGigzResponse<IHostProfile | IArtistProfile>> => {
  if (isHost) {
    return GigzFetcher.get<IHostProfile>(`hosts/${id}`);
  }
  return GigzFetcher.get<IArtistProfile>(`artists/${id}`);
};
