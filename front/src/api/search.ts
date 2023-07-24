import GigzFetcher from '../services/GigzFetcher';
import IGigzResponse from '../types/IGigzResponse';
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

// TODO, WIP
export const getProfileByIdAndType = async <T>(
  id: number,
  isHost = true
): Promise<IGigzResponse<T>> => {
  if (isHost) {
    return GigzFetcher.get<T>(`hosts/${id}`);
  }
  return GigzFetcher.get<T>(`artists/${id}`);
};
