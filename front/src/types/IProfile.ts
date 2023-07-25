import IGenre from './IGenre';
import IMedia from './IMedia';

export default interface IProfile {
  name: string;
  description?: string;

  websiteLink?: string;
  instagramLink?: string;
  facebookLink?: string;
  youtubeLink?: string;

  address?: string;
  city?: string;
  cityCode?: string;

  longitude?: number;
  latitude?: number;

  profilePicture?: string;
  genres: IGenre[];
  gallery: IMedia[];
}
