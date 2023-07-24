import IGenre from './IGenre';

export default interface IFilter {
  name: string;
  genres: IGenre[];
  capacityId: number;
}
