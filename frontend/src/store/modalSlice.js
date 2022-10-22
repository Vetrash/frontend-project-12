/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const modalState = (state) => state.modal;

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalShow: false,
    modalType: 'none',
    idChannel: -1,
  },
  reducers: {
    modalSwitch(state, action) {
      state.modalType = action.payload.modalType;
      state.isModalShow = action.payload.show;
      state.idChannel = action.payload.idChannel;
    },
  },
});

export const {
  modalSwitch,
} = modalSlice.actions;
export default modalSlice.reducer;
