import IGenre from './IGenre';

interface IResult {
  id: number;
  profilePicture: string;
  username: string;
  city: string;
  genres: IGenre[];
}

export default IResult;
