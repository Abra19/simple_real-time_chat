import { addMessage, removeAllChannelMessages } from '../slices/messagesSlice.js';
import {
  addChannel,
  changeCurrentChannel,
  removeChannel as removeChannelById,
  renameChannel as renameChannelById,
} from '../slices/channelsSlice.js';

const chatApi = (socket, store) => {
  const { dispatch } = store;

  const apiConnect = () => socket.connect();

  const apiDisconnect = () => socket.disconnect();

  socket.on('newMessage', (msg) => {
    dispatch(addMessage(msg));
  });

  const addNewMessage = (msg) => (new Promise((resolve, reject) => {
    socket.emit('newMessage', msg, (err, resp) => {
      if (resp.status !== 'ok') {
        reject(err);
      } else {
        resolve(resp);
      }
    });
  }));

  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });

  const addNewChannel = (channel) => (new Promise((resolve, reject) => {
    socket.emit('newChannel', channel, (err, resp) => {
      if (resp.status === 'ok') {
        dispatch(changeCurrentChannel(resp.data.id));
        resolve(resp);
      } else {
        reject(err);
      }
    });
  }));

  socket.on('removeChannel', (id) => {
    dispatch(removeChannelById(id));
    dispatch(removeAllChannelMessages(id));
  });

  const removeChannel = (id) => (new Promise((resolve, reject) => {
    socket.emit('removeChannel', { id }, (err, resp) => {
      if (resp.status === 'ok') {
        resolve(resp);
      } else {
        reject(err);
      }
    });
  }));

  socket.on('renameChannel', (channel) => {
    dispatch(renameChannelById(channel));
  });

  const renameChannel = (channel) => (new Promise((resolve, reject) => {
    socket.emit('renameChannel', channel, (err, resp) => {
      if (resp.status !== 'ok') {
        reject(err);
      } else {
        resolve(resp);
      }
    });
  }));

  return {
    apiConnect,
    apiDisconnect,
    addNewMessage,
    addNewChannel,
    removeChannel,
    renameChannel,
  };
};

export default chatApi;
