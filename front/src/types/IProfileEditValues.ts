import IGenre from './IGenre';
import IMedia from './IMedia';
import IProfilePicture from './IProfilePicture';

export interface IProfileEditValues {
  name?: string;
  description?: string;
  instagramLink?: string;
  facebookLink?: string;
  websiteLink?: string;
  youtubeLink?: string;
  spotifyLink?: string;
  deezerLink?: string;
  appleMusicLink?: string;
  soundcloudLink?: string;
  address?: string;
  city?: string;
  cityCode?: string;
  longitude?: number;
  latitude?: number;
  profilePicture?: IProfilePicture;
  genres?: IGenre[];
  gallery?: IMedia[];
}
