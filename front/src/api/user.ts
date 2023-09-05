import GigzFetcher from '../services/GigzFetcher';
import EProfileType from '../types/EProfileType';
import IArtistProfile from '../types/IArtistProfile';
import { IArtistProfileEditValues } from '../types/IArtistProfileEditValues';
import IGenre from '../types/IGenre';
import IGigzResponse from '../types/IGigzResponse';
import IHostProfile from '../types/IHostProfile';
import IHostProfileEditValues from '../types/IHostProfileEditValues';
import IMedia from '../types/IMedia';
import IPatchAccount from '../types/IPatchAccount';
import IProfilePicture from '../types/IProfilePicture';

export const getProfile = async (
  profileType: EProfileType
): Promise<IGigzResponse<IArtistProfile | IHostProfile>> => {
  return GigzFetcher.get(`me/${profileType}`);
};

export const patchAccount = (values: IPatchAccount) => {
  return GigzFetcher.patch<{ [key: string]: string }>('me/account', values);
};

export const patchArtistProfile = (artistValues: IArtistProfileEditValues) => {
  // Post new genres
  if (artistValues.genres) postGenresList(artistValues.genres);
  // Delete previous genres
  if (artistValues.genresToRemove)
    deleteGenresList(artistValues.genresToRemove);

  cleanProfilePatchFormValues(artistValues);
  return GigzFetcher.patch<IArtistProfile>('me/artist', artistValues);
};

export const patchHostProfile = (hostValues: IHostProfileEditValues) => {
  // Post new genres
  if (hostValues.genres) postGenresList(hostValues.genres);
  // Delete previous genres
  if (hostValues.genresToRemove) deleteGenresList(hostValues.genresToRemove);

  cleanProfilePatchFormValues(hostValues);
  return GigzFetcher.patch<IHostProfile>('me/host', hostValues);
};

function cleanProfilePatchFormValues(profileValues: any) {
  delete profileValues.value;
  delete profileValues.cityCode;
  delete profileValues.picture;
  delete profileValues.gallery;
  delete profileValues.code;
  delete profileValues.genres;
  delete profileValues.genresToRemove;
  if (profileValues.city === 0) profileValues.city = '';
  if (profileValues.longitude === 0) delete profileValues.longitude;
  if (profileValues.latitude === 0) delete profileValues.latitude;
}

export const patchProfilePicture = async (file: File) => {
  const formData = new FormData();

  formData.append('profile-picture', file);

  return GigzFetcher.patch<IProfilePicture>(
    'me/profile-picture',
    formData,
    { 'Content-Type': 'multipart/form-data' },
    true
  );
};

export const deleteProfilePicture = async () => {
  return GigzFetcher.delete<IProfilePicture>('me/profile-picture');
};

export const postPhotoGallery = (files: File[]) => {
  const formData = new FormData();

  files.forEach((file) => formData.append('media', file));

  return GigzFetcher.post<IMedia[]>(
    'me/gallery',
    formData,
    { 'Content-Type': 'multipart/form-data' },
    true
  );
};

export const deletePhotoGallery = (index: number) => {
  return GigzFetcher.delete<IMedia>('me/gallery/' + index);
};

export const postGenre = async (
  genreId: number
): Promise<IGigzResponse<IGenre>> => {
  return GigzFetcher.post<IGenre>('me/genres', { genreId });
};

export const deleteGenre = async (
  genreId: number
): Promise<IGigzResponse<IGenre>> => {
  return GigzFetcher.delete(`me/genres/${genreId}`);
};

export const postGenresList = async (genres: IGenre[]) => {
  const postGenreReqs: Promise<IGigzResponse<IGenre>>[] = [];
  genres.forEach((genre: IGenre) => {
    postGenreReqs.push(postGenre(genre.id));
  });
  return Promise.all(postGenreReqs);
};

export const deleteGenresList = async (genres: IGenre[]) => {
  const deleteGenreReqs: Promise<IGigzResponse<IGenre>>[] = [];
  genres.forEach((genre: IGenre) => {
    deleteGenreReqs.push(deleteGenre(genre.id));
  });
  return Promise.all(deleteGenreReqs);
};
