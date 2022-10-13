/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const modalState = (state) => state.modal;

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalShow: false,
    modalType: 'none',
    idChannel: -1,
  },
  reducers: {
    modalSwitch(state, action) {
      state.modalType = action.payload.modalType;
      state.modalShow = action.payload.show;
      state.idChannel = action.payload.idChannel;
    },
  },
});

export const {
  modalSwitch,
} = modalSlice.actions;
export default modalSlice.reducer;
