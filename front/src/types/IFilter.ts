import EProfileType from './EProfileType';
import IGenre from './IGenre';

export default interface IFilter {
  name: string;
  genres: IGenre[];
  capacity: number;
  type?: EProfileType;
}
