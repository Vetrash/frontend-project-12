/* eslint-disable no-param-reassign */
/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    login: '',
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
  },
});

export const {
  signIn, signOff,
} = userSlice.actions;
export default userSlice.reducer;
