/* eslint-disable no-param-reassign */
/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    user: {
      token: '',
      login: '',
    },
    error: null,
    data: {
      channels: [],
      messages: [],
      NameChannelsArr: [],
    },
    activChatId: 1,
    UI: {
      modalShow: false,
      idDropmenu: -1,
      modalType: 'none',
      errorlog: '',
      errorPlace: 'none',
    },
    watcher: 'off',
    idSelectedChannel: -1,
    formbox: '',
  },
  reducers: {
    updateData(state, action) {
      const newNameChannelsArr = action.payload.channels.map((elem) => elem.name);
      state.data.channels = action.payload.channels;
      state.data.messages = action.payload.messages;
      state.data.NameChannelsArr = newNameChannelsArr;
    },
    setChannel(state, action) {
      state.activChatId = action.payload;
    },
    signIn(state, action) {
      state.user.token = action.payload.token;
      state.user.login = action.payload.login;
    },
    signOff(state, action) {
      state.user.token = '';
      state.user.login = '';
    },
    removeChannel(state, action) {
      const newChannel = state.data.channels.filter((elem) => {
        if (elem.id !== action.payload.id) { return true; }
        return false;
      });
      const newMessages = state.data.messages.filter((elem) => {
        if (elem.id !== action.payload.id) { return true; }
        return false;
      });
      const newNameChannelsArr = newChannel.map((elem) => elem.name);
      state.data.channels = newChannel;
      state.data.NameChannelsArr = newNameChannelsArr;
      state.data.messages = newMessages;
    },
    renameChannel(state, action) {
      const index = state.data.channels.findIndex((elem) => elem.id === action.payload.id);
      state.data.channels[index].name = action.payload.name;
      const newNameChannelsArr = state.data.channels.map((elem) => elem.name);
      state.data.NameChannelsArr = newNameChannelsArr;
    },
    modalSwitch(state, action) {
      state.UI.modalType = action.payload.modalType;
      state.UI.modalShow = action.payload.show;
    },
    addChannel(state, action) {
      state.data.channels.push(action.payload);
      state.data.NameChannelsArr.push(action.payload.name);
    },
    addMessages(state, action) {
      const index = state.data.messages.indexOf((elem) => (elem.id === action.payload.id));
      if (index === -1) { state.data.messages.push(action.payload); }
    },
    onWatcher(state) {
      state.watcher = 'on';
    },
    swithDropMenu(state, action) {
      state.UI.idDropmenu = action.payload;
    },
    setidSelectedChannel(state, action) {
      state.idSelectedChannel = action.payload;
    },
    setErrorLog(state, action) {
      state.UI.errorlog = action.payload;
    },
    setErrorPlace(state, action) {
      state.UI.errorPlace = action.payload;
    },
  },
});

export const {
  updateData, setChannel, signIn,
  removeChannel, modalSwitch, addChannel,
  addMessages, onWatcher, swithDropMenu,
  setidSelectedChannel, setErrorLog, setErrorPlace,
  renameChannel, signOff,
} = usersSlice.actions;
export default usersSlice.reducer;
