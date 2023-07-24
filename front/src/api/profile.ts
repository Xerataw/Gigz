import GigzFetcher from '../services/GigzFetcher';
import IArtistProfile from '../types/IArtistProfile';
import IGenre from '../types/IGenre';
import IGigzResponse from '../types/IGigzResponse';
import IHostProfile from '../types/IHostProfile';
import { postGenre } from './genres';

export const patchArtistProfile = (artistValues: IArtistProfile) => {
  const genreReq: Promise<IGigzResponse<IGenre>>[] = [];

  artistValues.genres.forEach((genre: IGenre) => {
    genreReq.push(postGenre(genre.id));
  });

  Promise.all(genreReq);

  return GigzFetcher.patch<IArtistProfile>('me/artist', artistValues);
};

export const patchHostProfile = (hostValues: IHostProfile) => {
  const genreReq: Promise<IGigzResponse<IGenre>>[] = [];

  hostValues.genres.forEach((genre: IGenre) => {
    genreReq.push(postGenre(genre.id));
  });

  Promise.all(genreReq);
  return GigzFetcher.patch<IHostProfile>('me/host', hostValues);
};
