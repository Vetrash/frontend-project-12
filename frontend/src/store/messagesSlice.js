/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { updateData, removeChannel } from './channelSlice.js';

export const messagesState = (state) => state.messages;

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessages(state, action) {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateData.fulfilled, (state, action) => {
      state.messages = action.payload.messages;
    });
    builder.addCase(removeChannel, (state, action) => {
      const newMessages = state.messages.filter((elem) => {
        if (elem.id !== action.payload.id) { return true; }
        return false;
      });
      state.messages = newMessages;
    });
  },
});

export const { addMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
