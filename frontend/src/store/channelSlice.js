/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const channelState = (state) => state.channel;

export const updateData = createAsyncThunk(
  'chat/fetchDataChat',
  async (header) => {
    const response = await axios.get('/api/v1/data', {
      proxy: {
        host: 'localhost',
        port: 5001,
      },
      headers: {
        Authorization: header,
      },
    });
    return response.data;
  },
);

const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    channels: [],
    isDataLoad: false,
    activChatId: 1,
    waitSwitchChanell: false,
    language: 'ru',
  },
  reducers: {
    setChannel(state, action) {
      if (state.waitSwitchChanell) {
        state.activChatId = action.payload;
        state.waitSwitchChanell = false;
      }
    },
    removeChannel(state, action) {
      const newChannel = state.channels.filter((elem) => {
        if (elem.id !== action.payload.id) { return true; }
        return false;
      });
      if (action.payload.id === state.activChatId) {
        state.activChatId = 1;
      }
      state.channels = newChannel;
    },
    renameChannel(state, action) {
      const index = state.channels.findIndex((elem) => elem.id === action.payload.id);
      state.channels[index].name = action.payload.name;
    },
    addChannel(state, action) {
      state.channels.push(action.payload);
    },
    WaitSwitchChanellOn(state) {
      state.waitSwitchChanell = true;
    },
    setlanguage(state, action) {
      state.language = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateData.fulfilled, (state, action) => {
      state.channels = action.payload.channels;
      state.isDataLoad = true;
    })
      .addCase(updateData.rejected, (state, action) => {
        alert(action.error);
      });
  },
});

export const {
  setChannel, removeChannel, addChannel, renameChannel,
  swithDropMenu,
  WaitSwitchChanellOn,
  setlanguage,
} = channelSlice.actions;
export default channelSlice.reducer;
