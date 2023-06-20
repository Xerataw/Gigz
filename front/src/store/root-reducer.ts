import { combineReducers } from 'redux';
import userSlice from './user/user.slice';

const appReducer = combineReducers({
  user: userSlice,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
