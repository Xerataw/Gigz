import ICapacity from './ICapacity';
import { IProfileEditValues } from './IProfileEditValues';

export default interface IHostProfileEditValues extends IProfileEditValues {
  capacity?: ICapacity;
}
