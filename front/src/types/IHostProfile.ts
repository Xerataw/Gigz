import IProfile from './IProfile';

export default interface IHostProfile extends IProfile {
  address?: string;
  longitude?: number;
  latitude?: number;
  capcity?: number;
}
