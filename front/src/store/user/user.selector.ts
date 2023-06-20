import { User } from '../../types/User';
import { UserState } from './user.slice';

// IDK why the user is stored in a user object, but this is how it is and I'm not changing it
export const userSelector = (state: UserState) => (state.user.user) as User;
