import { io } from 'socket.io-client';

import store from '../slices/index.js';
import { addMessage } from '../slices/messagesSlice.js';
import { addChannel, changeCurrentChannel } from '../slices/channelsSlice.js';

const socketApi = () => {
  const socket = io();

  const { dispatch } = store;

  const apiConnect = () => socket.connect();

  const apiDisconnect = () => socket.disconnect();

  socket.on('newMessage', (msg) => {
    dispatch(addMessage(msg));
  });

  const addNewMessage = (msg) => socket.emit('newMessage', msg, (resp) => {
    if (resp.status !== 'ok') {
      console.log(resp.status); // temporary solution - to do
    }
  });

  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });

  const addNewChannel = (channel) => socket.emit('newChannel', channel, (resp) => {
    if (resp.status === 'ok') {
      dispatch(changeCurrentChannel(resp.data.id));
    } else {
      console.log(resp.status); // temporary solution - to do
    }
  });

  return {
    apiConnect,
    apiDisconnect,
    addNewMessage,
    addNewChannel,
  };
};

export default socketApi;
