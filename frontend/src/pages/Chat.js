import React from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { signOff } from '../store/userSlice.js';
import RenderModal from '../Components/modal/RenderModal.js';
import ChannelList from './chatItems/ChanelList.js';
import ChatWindow from './chatItems/ChatWindow.js';

const Chat = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const clickhandlerlogOut = () => {
    dispatch(signOff());
  };

  return (
    <>
      <div className={cn('h-100')}>
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
              <div className="container">
                <Link to="/" className="navbar-brand">{t('logo')}</Link>
                <button onClick={clickhandlerlogOut} type="button" className="btn btn-primary">{t('exit')}</button>
              </div>
            </nav>
            <div className="container h-100 my-4 overflow-hidden rounded shadow">
              <div className="row h-100 bg-white flex-md-row">
                <div className="d-flex flex-column col-4 col-md-2 border-end pt-5 px-0 bg-light h-100">
                  <ChannelList />
                </div>
                <ChatWindow />
              </div>
            </div>
          </div>
        </div>
      </div>
      {RenderModal()}
    </>
  );
};

export default Chat;
