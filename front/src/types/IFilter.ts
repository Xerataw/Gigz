import EProfileType from './EProfileType';
import IGenre from './IGenre';
import ILocation from './ILocation';

export default interface IFilter {
  name: string;
  genres: IGenre[];
  capacities: [number, number];
  type?: EProfileType;
  location?: ILocation;
}
