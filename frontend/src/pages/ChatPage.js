import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
// import Chat from './Chat.js';
import Chat from './chatItems/Chat.js';
import LoadingPage from './LoadingPage.js';
import { updateData } from '../store/chatSlice.js';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { isDataLoad } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(updateData());
  }, []);

  const renderPage = () => {
    if (isDataLoad) {
      return <Chat />;
    }
    return <LoadingPage />;
  };

  return (
    <>
      {renderPage()}
    </>
  );
};

export default ChatPage;
