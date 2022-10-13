import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import Chat from './Chat.js';
import LoadingPage from './components/LoadingPage.js';
import { updateData, channelState } from '../../store/channelSlice.js';
import { userState } from '../../store/userSlice.js';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { isDataLoad } = useSelector(channelState);
  const { token } = useSelector(userState);
  useEffect(() => {
    const header = token.length < 2 ? `Bearer ${localStorage.getItem('token')}` : token;
    dispatch(updateData(header));
  }, []);

  return (
    /* eslint-disable */
    <>
      {isDataLoad ? <Chat /> : <LoadingPage />}
    </>
    /* eslint-enable */
  );
};

export default ChatPage;
