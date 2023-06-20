import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface UserState {
  user: User;
}

const userInitialState: UserState = {
  user: {} as User,
};

const user = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    initUser(state, { payload }) {
      state.user = payload;
    },
  },
});

export const { initUser } = user.actions;

export default user.reducer;
