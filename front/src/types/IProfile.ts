import Media from './Media';
import Genre from './Genre';

export default interface IProfile {
  name: string;
  profilePicture?: string;
  description?: string;
  city?: string;
  genres: Genre[];
  mediaList: Media[];
  websiteLink?: string;
  instagramLink?: string;
  facebookLink?: string;
}
