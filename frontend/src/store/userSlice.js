/* eslint-disable no-param-reassign */
/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    login: '',
    watcher: 'off',
  },
  reducers: {
    signIn(state, action) {
      state.token = action.payload.token;
      state.login = action.payload.login;
    },
    signOff(state, action) {
      state.token = '';
      state.login = '';
    },
    onWatcher(state) {
      state.watcher = 'on';
    },
  },
});

export const {
  signIn, onWatcher, signOff,
} = userSlice.actions;
export default userSlice.reducer;
