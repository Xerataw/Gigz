import Media from './Media';
import Genre from './Genre';

export default interface IProfile {
  username: string;
  profilePicture?: string;
  bio?: string;
  city?: string;
  genres: Genre[];
  mediaList: Media[];
}
