/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import fetchData from './fetchData.js';

const generalChanelId = 1;

const initialState = {
  channels: [],
  currentChannelId: generalChanelId,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => {
      state.channels = [...state.channels, payload];
    },
    changeCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.channels = action.payload.channels;
        state.currentChannelId = action.payload.currentChannelId;
      });
  },
});

export const { addChannel, changeCurrentChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
