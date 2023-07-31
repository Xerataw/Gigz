import IGenre from './IGenre';
import IProfilePicture from './IProfilePicture';

interface IResult {
  id: number;
  profilePicture: IProfilePicture;
  name: string;
  city: string;
  genres: IGenre[];
}

export default IResult;
