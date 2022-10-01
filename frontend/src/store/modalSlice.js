/* eslint-disable no-param-reassign */
/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalShow: false,      
    modalType: 'none',
    errorModallog: '',
    errorModalPlace: 'none',
  },
  reducers: {
    modalSwitch(state, action) {
      state.modalType = action.payload.modalType;
      state.modalShow = action.payload.show;
    },
    setErrorLog(state, action) {
      state.errorlog = action.payload.log;
      state.errorPlace = action.payload.place;
    },
  },
});

export const {
modalSwitch, setErrorLog
} = modalSlice.actions;
export default modalSlice.reducer;
