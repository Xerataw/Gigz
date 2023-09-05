import IGenre from './IGenre';
import IProfile from './IProfile';
import IProfilePicture from './IProfilePicture';

export default interface IResult {
  artists: IProfile[];
  isLastPage: boolean;
}

export interface IProfileResult {
  id: number;
  profilePicture: IProfilePicture;
  name: string;
  city: string;
  genres: IGenre[];
  isLiked: boolean;
}
