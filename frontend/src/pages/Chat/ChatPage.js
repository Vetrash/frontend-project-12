import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import Chat from './Chat.js';
import LoadingPage from './components/LoadingPage.js';
import { updateData, channelState } from '../../store/channelSlice.js';
import { signIn, userState } from '../../store/userSlice.js';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { isDataLoad } = useSelector(channelState);
  const { token } = useSelector(userState);
  const header = `Bearer ${localStorage.getItem('token')}`;
  useEffect(() => {
    dispatch(updateData(header));
    if (token === '') {
      const localToken = localStorage.getItem('token');
      const localLogin = localStorage.getItem('username');
      dispatch(signIn({ login: localLogin, token: localToken }));
    }
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
