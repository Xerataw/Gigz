import EProfileType from './EProfileType';
import IGenre from './IGenre';

export default interface IFilter {
  name: string;
  genres: IGenre[];
  capacities: [number, number];
  type?: EProfileType;
}
