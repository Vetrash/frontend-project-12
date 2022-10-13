import { configureStore } from '@reduxjs/toolkit';
import channelSlice from './channelSlice.js';
import modalSlice from './modalSlice.js';
import userReduser from './userSlice.js';
import messagesSlice from './messagesSlice.js';

export default configureStore({
  reducer: {
    user: userReduser,
    modal: modalSlice,
    channel: channelSlice,
    messages: messagesSlice,
  },
});
