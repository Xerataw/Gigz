import GigzFetcher from '../services/GigzFetcher';
import IArtistProfile from '../types/IArtistProfile';
import IGenre from '../types/IGenre';
import IGigzResponse from '../types/IGigzResponse';
import IHostProfile from '../types/IHostProfile';
import { postGenre } from './genres';

export const patchArtistProfile = (values: any) => {
  const {
    name,
    description,
    spotifyLink,
    instagramLink,
    facebookLink,
    soundcloudLink,
    youtubeLink,
    appleMusicLink,
    websiteLink,
    deezerLink,
    genres,
    address,
  } = values;

  const genreReq: Promise<IGigzResponse<IGenre>>[] = [];

  genres.forEach((genreId: number) => {
    genreReq.push(postGenre(genreId));
  });

  Promise.all(genreReq);

  return GigzFetcher.patch<IArtistProfile>('me/artist', {
    name,
    description,
    spotifyLink,
    instagramLink,
    facebookLink,
    soundcloudLink,
    youtubeLink,
    appleMusicLink,
    websiteLink,
    deezerLink,
    latitude: address.latitude,
    longitude: address.longitude,
  });
};

export const patchHostProfile = () => {
  GigzFetcher.patch<IHostProfile>('profiles/host', {});
};
