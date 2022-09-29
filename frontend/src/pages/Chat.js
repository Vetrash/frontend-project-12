import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import cn from 'classnames';
import i18n from 'i18next';
import { Link } from 'react-router-dom';
import filter from 'leo-profanity';
import {
  updateData,
  setChannel,
  modalSwitch,
  swithDropMenu,
  setidSelectedChannel,
  signOff,
} from '../store/usersSlice.js';
import RenderModal from '../Components/modalAddChannel.js';

const Chat = (props) => {
  filter.loadDictionary('ru');
  const dispatch = useDispatch();
  const { channels, messages } = useSelector((state) => state.users.data);
  const { UI, activChatId } = useSelector((state) => state.users);
  const { socket } = props;
  const login = localStorage.getItem('login');
  const chatref = useRef();
  const dropMenuRef = useRef();
  const chanelRef = useRef();
  const removeRef = useRef();
  const renameRef = useRef();
  const getNewData = () => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;

    axios.get('/api/v1/data', {
      proxy: {
        host: 'localhost',
        port: 5001,
      },
    }).then((response) => {
      dispatch(updateData(response.data));
    });
  };

  const handleClick = (e) => {
    const targetClick = e.target;
    let IsdropdownItem = false;
    if (targetClick.classList.contains('dropdown-item') || targetClick.classList.contains('dropdown-toggle')
    ) { IsdropdownItem = true; }
    if (!IsdropdownItem && UI.IsdropdownItem !== -1) {
      dropMenuRef.current.classList.remove('show');
      dispatch(swithDropMenu(-1));
    }
  };

  useEffect(() => {
    getNewData();
    document.addEventListener('click', handleClick);
  }, []);
  useEffect(() => {
    chatref.current.scrollTop = chatref.current.scrollHeight;
  }, [messages]);

  const clickhandlerlogOut = () => {
    dispatch(signOff());
    localStorage.removeItem('token');
  };

  const switchChanel = (e) => {
    const newIdChanel = Number(e.target.attributes.id.nodeValue);
    if (newIdChanel !== activChatId) {
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
    dispatch(swithDropMenu(newID));
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
      <button type="button" onClick={RemoveChannelHandler} className="dropdown-item" ref={removeRef}>{i18n.t('delet')}</button>
      <button type="button" onClick={RenameChannelHandler} className="dropdown-item" ref={renameRef}>{i18n.t('rename')}</button>
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
                <span className="visually-hidden">Управление каналом</span>
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
    let activChat = 'general';
    channels.forEach((elem) => {
      if (elem.id === activChatId) { activChat = elem.name; }
    });

    const allMessage = [...messages].filter((elem) => elem.channelId === activChatId);
    const count = allMessage.length === 11 ? 10 : allMessage.length % 10;
    return (
      <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
              <b>{`# ${activChat}`}</b>
            </p>
            <span className="text-muted">
              {allMessage.length}
              {i18n.t('messages.key_interval', { postProcess: 'interval', count })}
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
                  placeholder={i18n.t('newMessage')}
                  className="border-0 p-0 ps-2 form-control"
                  onChange={formik.handleChange}
                  value={formik.values.message}
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
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
              <div className="container">
                <Link to="/" className="navbar-brand">{i18n.t('logo')}</Link>
                <button onClick={clickhandlerlogOut} type="button" className="btn btn-primary">{i18n.t('exit')}</button>
              </div>
            </nav>
            <div className="container h-100 my-4 overflow-hidden rounded shadow">
              <div className="row h-100 bg-white flex-md-row">
                <div className="d-flex flex-column col-4 col-md-2 border-end pt-5 px-0 bg-light h-100">
                  <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                    <span>{i18n.t('channels')}</span>
                    <button onClick={addChannel} type="button" className="p-0 text-primary btn btn-group-vertical">
                      <img src="./img/add_box.svg" alt="add" />
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
      {RenderModal(socket)}
    </>
  );
};

export default Chat;
