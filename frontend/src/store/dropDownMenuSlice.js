/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'dropDownMenu',
  initialState: {
    posX: 0,
    posY: 0,
    idChannel: -1,
    isShowed: false,
  },
  reducers: {
    setDropMenu(state, action) {
      state.posX = action.payload.posX;
      state.posY = action.payload.posY;
      state.idChannel = action.payload.idChannel;
      state.isShowed = true;
    },
    offDropDownMenu(state) {
      state.isShowed = false;
    },
  },
});

export const {
  setDropMenu, offDropDownMenu,
} = chatSlice.actions;

export default chatSlice.reducer;
