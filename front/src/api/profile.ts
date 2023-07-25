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

  cleanArtistFormValues(artistValues);
  return GigzFetcher.patch<IArtistProfile>('me/artist', artistValues);
};

export const patchHostProfile = (hostValues: IHostProfile) => {
  const genreReq: Promise<IGigzResponse<IGenre>>[] = [];

  hostValues.genres.forEach((genre: IGenre) => {
    genreReq.push(postGenre(genre.id));
  });
  Promise.all(genreReq);

  cleanHostFormValues(hostValues);
  return GigzFetcher.patch<IHostProfile>('me/host', hostValues);
};

function cleanHostFormValues(hostValues: any) {
  delete hostValues.value;
  delete hostValues.cityCode;
  delete hostValues.picture;
  delete hostValues.gallery;
  delete hostValues.code;
  delete hostValues.genres;
  if (hostValues.city === 0) hostValues.city = '';
  if (hostValues.longitude === 0) delete hostValues.longitude;
  if (hostValues.latitude === 0) delete hostValues.latitude;
}

function cleanArtistFormValues(artistValues: any) {
  if (artistValues.city === 0) artistValues.city = '';
  if (artistValues.longitude === 0) delete artistValues.longitude;
  if (artistValues.latitude === 0) delete artistValues.latitude;
}
