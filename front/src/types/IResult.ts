import IGenre from './IGenre';

interface IResult {
  id: number;
  profilePicture: string;
  name: string;
  city: string;
  genres: IGenre[];
  isLiked: boolean;
}

export default IResult;
