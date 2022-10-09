/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalShow: false,
    modalType: 'none',
  },
  reducers: {
    modalSwitch(state, action) {
      state.modalType = action.payload.modalType;
      state.modalShow = action.payload.show;
    },
  },
});

export const {
  modalSwitch,
} = modalSlice.actions;
export default modalSlice.reducer;
