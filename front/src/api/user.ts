import GigzFetcher from '../services/GigzFetcher';
import IGigzResponse from '../types/IGigzResponse';
import EProfileType from '../types/EProfileType';

export const getProfile = async (
  profileType: EProfileType
): Promise<IGigzResponse<any>> => {
  return GigzFetcher.get(`me/${profileType}`);
};
