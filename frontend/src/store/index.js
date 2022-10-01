import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './chatSlice.js';
import modalSlice from './modalSlice.js';
import userReduser from './userSlice.js';

export default configureStore({
  reducer: {
    user: userReduser,
    modal: modalSlice,
    chat: chatSlice,
  },
});
