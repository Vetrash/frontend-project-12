import React, { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import SocketContext from '../../../Components/SocketContext.js';
import getLanguage from '../../../Components/getLanguage.js';
import { channelState } from '../../../store/channelSlice.js';
import { messagesState } from '../../../store/messagesSlice.js';

const ChatWindow = () => {
  const { channels, activChatId } = useSelector(channelState);
  const { messages } = useSelector(messagesState);
  const { t } = useTranslation();
  const login = localStorage.getItem('login');
  const { NewMessage } = useContext(SocketContext);
  const chatref = useRef();
  const messageref = useRef();

  useEffect(() => {
    messageref.current.focus();
  }, []);
  useEffect(() => {
    if (messages.length !== 0) {
      chatref.current.scrollTop = chatref.current.scrollHeight;
    }
    messageref.current.focus();
  }, [messages, activChatId]);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      if (values.message.length !== 0) {
        const lng = getLanguage(values.message);
        filter.loadDictionary(lng);
        const cenztext = filter.clean(values.message);
        NewMessage(cenztext, activChatId);
        /* eslint-disable no-param-reassign */
        values.message = '';
        /* eslint-disable no-param-reassign */
      }
    },
  });

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

export default ChatWindow;
