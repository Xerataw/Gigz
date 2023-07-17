import GigzFetcher from '../services/GigzFetcher';
import IGigzResponse from '../types/IGigzResponse';
import EProfileType from '../types/EProfileType';
import IArtistProfile from '../types/IArtistProfile';
import IHostProfile from '../types/IHostProfile';

export const getProfile = async (
  profileType: EProfileType
): Promise<IGigzResponse<IArtistProfile | IHostProfile>> => {
  return GigzFetcher.get(`me/${profileType}`);
};
