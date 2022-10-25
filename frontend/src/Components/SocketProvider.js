import React, { useCallback, useMemo } from 'react';
import { setChannel } from '../store/channelSlice.js';
import store from '../store/index.js';

export const getSocketContext = React.createContext({});

const SocketProvider = ({ children, socket }) => {
  const SocketContext = getSocketContext;
  const newChannel = useCallback((name) => {
    socket.emit('newChannel', { name }, (payload) => {
      store.dispatch(setChannel(payload.data.id));
    });
  }, []);
  const newMessage = useCallback((body, channelId) => {
    socket.emit('newMessage', {
      body, channelId, username: localStorage.getItem('login'),
    });
  }, []);
  const delChannel = useCallback((id) => {
    socket.emit('removeChannel', { id });
  }, []);
  const renameChannel = useCallback((id, name) => {
    socket.emit('renameChannel', { id, name });
  }, []);
  const valueProw = useMemo(() => ({
    socket, newChannel, newMessage, delChannel, renameChannel,
  }), [socket]);

  return (
    <SocketContext.Provider value={valueProw}>
      {children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
