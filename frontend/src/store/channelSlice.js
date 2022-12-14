/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const channelState = (state) => state.channel;
export const getChannelsNames = (state) => state.channel.channels.map((elem) => elem.name);
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

const generalChannelid = 1;

const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    channels: [],
    isDataLoad: false,
    activChatId: generalChannelid,
    language: 'ru',
  },
  reducers: {
    setChannel(state, action) {
      state.activChatId = action.payload;
    },
    removeChannel(state, action) {
      const newChannel = state.channels.filter((elem) => {
        if (elem.id !== action.payload.id) { return true; }
        return false;
      });
      if (action.payload.id === state.activChatId) {
        state.activChatId = generalChannelid;
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
        alert(action.error.message);
      });
  },
});

export const {
  setChannel, removeChannel, addChannel, renameChannel,
  swithDropMenu,
  setlanguage,
} = channelSlice.actions;
export default channelSlice.reducer;
