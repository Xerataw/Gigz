import GigzFetcher from '../services/GigzFetcher';
import EProfileType from '../types/EProfileType';
import IArtistProfile from '../types/IArtistProfile';
import { IArtistProfileEditValues } from '../types/IArtistProfileEditValues';
import IGenre from '../types/IGenre';
import IGigzResponse from '../types/IGigzResponse';
import IHostProfile from '../types/IHostProfile';
import IHostProfileEditValues from '../types/IHostProfileEditValues';
import IMedia from '../types/IMedia';
import IProfilePicture from '../types/IProfilePicture';

export const getProfile = async (
  profileType: EProfileType
): Promise<IGigzResponse<IArtistProfile | IHostProfile>> => {
  return GigzFetcher.get(`me/${profileType}`);
};

export const patchArtistProfile = (artistValues: IArtistProfileEditValues) => {
  if (artistValues.genres) {
    const genreReq: Promise<IGigzResponse<IGenre>>[] = [];
    artistValues.genres.forEach((genre: IGenre) => {
      genreReq.push(postGenre(genre.id));
    });
    Promise.all(genreReq);
  }

  cleanProfilePatchFormValues(artistValues);
  return GigzFetcher.patch<IArtistProfile>('me/artist', artistValues);
};

export const patchHostProfile = (hostValues: IHostProfileEditValues) => {
  if (hostValues.genres) {
    const genreReq: Promise<IGigzResponse<IGenre>>[] = [];
    hostValues.genres.forEach((genre: IGenre) => {
      genreReq.push(postGenre(genre.id));
    });
    Promise.all(genreReq);
  }

  cleanProfilePatchFormValues(hostValues);
  return GigzFetcher.patch<IHostProfile>('me/host', hostValues);
};

function cleanProfilePatchFormValues(hostValues: any) {
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
