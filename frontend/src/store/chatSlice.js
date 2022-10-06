/* eslint-disable no-param-reassign */
/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    messages: [],
    NameChannelsArr: [],
    dataLoad: false,
    idSelectedChannel: -1,
    activChatId: 1,
    waitSwitchChanell: false,
  },
  reducers: {
    updateData(state, action) {
      const newNameChannelsArr = action.payload.channels.map((elem) => elem.name);
      state.channels = action.payload.channels;
      state.messages = action.payload.messages;
      state.NameChannelsArr = newNameChannelsArr;
      state.dataLoad = true;
    },
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
      const newNameChannelsArr = newChannel.map((elem) => elem.name);
      state.channels = newChannel;
      state.NameChannelsArr = newNameChannelsArr;
      state.messages = newMessages;
    },
    renameChannel(state, action) {
      const index = state.channels.findIndex((elem) => elem.id === action.payload.id);
      state.channels[index].name = action.payload.name;
      const newNameChannelsArr = state.channels.map((elem) => elem.name);
      state.NameChannelsArr = newNameChannelsArr;
    },
    addChannel(state, action) {
      state.channels.push(action.payload);
      state.NameChannelsArr.push(action.payload.name);
    },
    addMessages(state, action) {
      const index = state.messages.indexOf((elem) => (elem.id === action.payload.id));
      if (index === -1) { state.messages.push(action.payload); }
    },
    setidSelectedChannel(state, action) {
      state.idSelectedChannel = action.payload;
    },
    onWaitSwitchChanell(state, action) {
      state.waitSwitchChanell = true;
    },
  },
});

export const {
  updateData,
  setChannel, removeChannel, addChannel, renameChannel,
  addMessages,
  swithDropMenu,
  setidSelectedChannel,
  onWaitSwitchChanell,
} = chatSlice.actions;
export default chatSlice.reducer;
