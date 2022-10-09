/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateData = createAsyncThunk(
  'chat/fetchDataChat',
  async () => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
    const response = await axios.get('/api/v1/data', {
      proxy: {
        host: 'localhost',
        port: 5001,
      },
    });
    return response.data;
  },
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    messages: [],
    isDataLoad: false,
    idSelectedChannel: -1,
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
      const newMessages = state.messages.filter((elem) => {
        if (elem.id !== action.payload.id) { return true; }
        return false;
      });
      if (action.payload.id === state.activChatId) {
        state.activChatId = 1;
      }
      state.channels = newChannel;
      state.messages = newMessages;
    },
    renameChannel(state, action) {
      const index = state.channels.findIndex((elem) => elem.id === action.payload.id);
      state.channels[index].name = action.payload.name;
    },
    addChannel(state, action) {
      state.channels.push(action.payload);
    },
    addMessages(state, action) {
      state.messages.push(action.payload);
    },
    setidSelectedChannel(state, action) {
      state.idSelectedChannel = action.payload;
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
      state.messages = action.payload.messages;
      state.isDataLoad = true;
    });
  },
});

export const {
  setChannel, removeChannel, addChannel, renameChannel,
  addMessages,
  swithDropMenu,
  setidSelectedChannel,
  WaitSwitchChanellOn,
  setlanguage,
} = chatSlice.actions;
export default chatSlice.reducer;
