import GigzFetcher from '../services/GigzFetcher';
import IGigzResponse from '../types/IGigzResponse';

export interface ICapacities {
  id: number;
  max: number;
  color: string;
  bgColor: string;
}
export const getCapacities = async (): Promise<
  IGigzResponse<ICapacities[]>
> => {
  return GigzFetcher.get('capacities');
};
