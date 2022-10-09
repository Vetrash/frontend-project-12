import { io } from 'socket.io-client';
import React from 'react';
import SocketContext from './SocketContext.js';

const SocketProvider = ({ children }) => {
  const socket = io();

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
