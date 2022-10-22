import { io } from 'socket.io-client';
import React from 'react';
import SocketContext from './SocketContext.js';
import { setChannel } from '../store/channelSlice.js';
import store from '../store/index.js';

const SocketProvider = ({ children }) => {
  const socket = io();
  const NewChannel = (name) => {
    socket.emit('newChannel', { name }, (payload) => {
      store.dispatch(setChannel(payload.data.id));
    });
  };
  const NewMessage = (body, channelId) => {
    socket.emit('newMessage', {
      body, channelId, username: localStorage.getItem('login'),
    });
  };
  const RemoveChannel = (id) => {
    socket.emit('removeChannel', { id });
  };
  const RenameChannel = (id, name) => {
    socket.emit('renameChannel', { id, name });
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SocketContext.Provider value={{
      socket, NewChannel, NewMessage, RemoveChannel, RenameChannel,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
