import React, { useContext, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import filter from 'leo-profanity';
import { signOff } from '../store/userSlice.js';
import {
  setChannel,
  setidSelectedChannel,
  WaitSwitchChanellOn,
} from '../store/chatSlice.js';
import { modalSwitch } from '../store/modalSlice.js';
import RenderModal from '../Components/modal/RenderModal.js';
import SocketContext from '../Components/SocketContext.js';
import getLanguage from '../Components/getLanguage.js';

const Chat = () => {
  const dispatch = useDispatch();
  const {
    channels,
    messages,
    activChatId,
  } = useSelector((state) => state.chat);

  const { socket } = useContext(SocketContext);
  const { t } = useTranslation();
  const login = localStorage.getItem('login');
  const chatref = useRef();
  const messageref = useRef();
  const dropMenuRef = useRef();
  const chanelRef = useRef();
  const removeRef = useRef();
  const renameRef = useRef();

  const handleClick = (e) => {
    const targetClick = e.target;
    const IsdropdownItem = (targetClick.classList.contains('dropdown-item') || targetClick.classList.contains('dropdown-toggle')
    );
    if (!IsdropdownItem && dropMenuRef.current !== null) {
      dropMenuRef.current.classList.remove('show');
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    messageref.current.focus();
  }, []);
  useEffect(() => {
    if (messages.length !== 0) {
      chatref.current.scrollTop = chatref.current.scrollHeight;
    }
    messageref.current.focus();
  }, [messages, activChatId]);

  const clickhandlerlogOut = () => {
    dispatch(signOff());
  };

  const switchChanel = (e) => {
    const newIdChanel = Number(e.target.attributes.id.nodeValue);
    if (newIdChanel !== activChatId) {
      dispatch(WaitSwitchChanellOn());
      dispatch(setChannel(newIdChanel));
    }
  };

  const RemoveChannelHandler = (e) => {
    const removeId = Number(e.target.getAttribute('data-id'));
    dispatch(setidSelectedChannel(removeId));
    dispatch(modalSwitch({ show: true, modalType: 'remove' }));
  };
  const RenameChannelHandler = (e) => {
    const renameId = Number(e.target.getAttribute('data-id'));
    dispatch(setidSelectedChannel(renameId));
    dispatch(modalSwitch({ show: true, modalType: 'rename' }));
  };
  const activDropMenu = (elem) => {
    const newID = Number(elem.target.attributes.id.value);
    const { pageY } = elem;
    const posY = pageY - 82;
    const posX = chanelRef.current.offsetWidth / 1.5 + chanelRef.current.offsetLeft;
    dropMenuRef.current.setAttribute('style', `left: ${posX}px; top: ${posY}px`);
    removeRef.current.setAttribute('data-id', newID);
    renameRef.current.setAttribute('data-id', newID);
    dropMenuRef.current.classList.add('show');
  };
  const dropMenu = () => (
    <div
      className="dropdown-menu mydropmenu"
      data-popper-reference-hidden="false"
      data-popper-escaped="false"
      data-popper-placement="bottom-start"
      ref={dropMenuRef}
    >
      <button type="button" onClick={RemoveChannelHandler} className="dropdown-item" ref={removeRef}>{t('delet')}</button>
      <button type="button" onClick={RenameChannelHandler} className="dropdown-item" ref={renameRef}>{t('rename')}</button>
    </div>
  );

  const renderChannelsList = () => {
    const list = channels.map((item) => {
      if (item.removable) {
        return (
          <li className="nav-item w-100 flex-grow-0" key={item.id}>
            <div role="group" className="d-flex dropdown btn-group">
              <button
                onClick={switchChanel}
                type="button"
                className={cn('w-100  btn  rounded-0 text-start text-truncate', { 'btn-secondary': Number(item.id) === activChatId })}
                id={item.id}
              >
                <span className="me-1">#</span>
                {item.name}
              </button>
              <button
                onClick={activDropMenu}
                type="button"
                id={item.id}
                aria-expanded="false"
                className={cn('flex-grow-0 dropdown-toggle dropdown-toggle-split btn', { 'btn-secondary': Number(item.id) === activChatId })}
              >
                <span className="visually-hidden">{t('channelControl')}</span>
              </button>
            </div>
          </li>
        );
      }
      return (
        <li className="nav-item w-100 flex-grow-0" key={item.id}>
          <button
            onClick={switchChanel}
            type="button"
            className={cn('w-100 btn rounded-0 text-start text-truncate', { 'btn-secondary': Number(item.id) === activChatId })}
            id={item.id}
          >
            <span className="me-1">#</span>
            {item.name}
          </button>
        </li>
      );
    });
    return (
      <ul className="nav flex-column nav-pills nav-fill px-2 overflow-auto flex-grow-1 flex-nowrap myscroll mb-3" ref={chanelRef}>
        {dropMenu()}
        {list}
      </ul>
    );
  };
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      if (values.message.length !== 0) {
        const lng = getLanguage(values.message);
        filter.loadDictionary(lng);
        const cenztext = filter.clean(values.message);
        socket.emit('newMessage', {
          body: cenztext,
          channelId: activChatId,
          username: localStorage.getItem('login'),
        });
        /* eslint-disable no-param-reassign */
        values.message = '';
        /* eslint-disable no-param-reassign */
      }
    },
  });

  const addChannel = () => {
    dispatch(modalSwitch({ show: true, modalType: 'add' }));
  };

  const renderChat = () => {
    const activChat = channels.find((elem) => elem.id === activChatId);
    const nameActivChat = activChat !== undefined ? activChat.name : 'error';

    const allMessage = [...messages].filter((elem) => elem.channelId === activChatId);
    const count = allMessage.length === 11 ? 10 : allMessage.length % 10;
    return (
      <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
              <b>{`# ${nameActivChat}`}</b>
            </p>
            <span className="text-muted">
              {allMessage.length}
              {t('messages.key_interval', { postProcess: 'interval', count })}
            </span>
          </div>
          <div id="messages-box" className="chat-messages overflow-auto px-5 " ref={chatref}>
            {allMessage.map((elem) => {
              if (elem.username === login) {
                return (
                  <div className="text-break mb-2 text-end" key={elem.id}>
                    {`${elem.body} :`}
                    <b>
                      {elem.username}
                    </b>
                  </div>
                );
              }
              return (
                <div className="text-break mb-2 text-start" key={elem.id}>
                  <b>
                    {elem.username}
                  </b>
                  {`: ${elem.body}`}
                </div>
              );
            })}
          </div>
          <div className="mt-auto px-5 py-3">
            <form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
              <div className="input-group has-validation">
                <input
                  name="message"
                  id="message"
                  aria-label="Новое сообщение"
                  placeholder={t('newMessage')}
                  className="border-0 p-0 ps-2 form-control"
                  onChange={formik.handleChange}
                  value={formik.values.message}
                  ref={messageref}
                />
                <button type="submit" disabled="" className="btn btn-group-vertical">
                  <img src="./img/send.svg" alt="" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
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
                  <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                    <span>{t('channels')}</span>
                    <button onClick={addChannel} type="button" className="p-0 text-primary btn btn-group-vertical">
                      <img src="./img/add_box.svg" alt="add" />
                      <span className="visually-hidden">{t('addChanel')}</span>
                    </button>
                  </div>
                  {renderChannelsList()}
                </div>
                {renderChat()}
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
