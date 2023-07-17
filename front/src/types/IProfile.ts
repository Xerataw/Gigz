import IGenre from './IGenre';
import IMedia from './IMedia';

export default interface IProfile {
  name: string;
  profilePicture?: string;
  description?: string;
  city?: string;
  genres: IGenre[];
  gallery: IMedia[];
  websiteLink?: string;
  instagramLink?: string;
  facebookLink?: string;
  longitude?: number;
  latitude?: number;
}
