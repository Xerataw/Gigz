import ICapacity from './ICapacity';
import IProfile from './IProfile';

export default interface IHostProfile extends IProfile {
  capacityId?: number;
  capacity: ICapacity;
}
