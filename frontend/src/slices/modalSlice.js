/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modals: {
    isShown: false,
    modalType: '',
  },
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.modals.isShown = true;
      state.modals.modalType = payload;
    },
    closeModal: (state) => {
      state.modals.isShown = false;
      state.modals.targetId = '';
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
