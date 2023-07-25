import GigzFetcher from '../services/GigzFetcher';
import ICapacity from '../types/ICapacity';
import IGigzResponse from '../types/IGigzResponse';

export const getCapacities = async (): Promise<IGigzResponse<ICapacity[]>> => {
  return GigzFetcher.get('capacities');
};
