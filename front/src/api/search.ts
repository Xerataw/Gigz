import GigzFetcher from '../services/GigzFetcher';
import IArtistProfile from '../types/IArtistProfile';
import IGigzResponse from '../types/IGigzResponse';
import IHostProfile from '../types/IHostProfile';
import IResult from '../types/IResult';

export const getResults = () => {
  return new Promise<IGigzResponse<IResult[]>>((resolve, reject) => {
    GigzFetcher.get<IResult[]>('/hosts')
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
