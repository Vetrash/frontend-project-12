/* eslint-disable no-param-reassign */
import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeChannel } from '../../store/chatSlice.js';
import {
  modalSwitch,
} from '../../store/modalSlice.js';
import { ToastRemoveChannel } from '../toasts.js';
import SocketContext from '../SocketContext.js';

const RemoveChannelModal = () => {
  const { t } = useTranslation();
  const { socket } = useContext(SocketContext);
  const { idSelectedChannel } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(modalSwitch(false));
  };

  const submit = () => {
    socket.emit('removeChannel', { id: idSelectedChannel });
    dispatch(removeChannel(idSelectedChannel));
    ToastRemoveChannel();
    closeModal();
  };

  return (
    <form onSubmit={submit} className="">
      <div>
        <p className="lead">{t('deletLead')}</p>
        <div className="d-flex justify-content-end">
          <button onClick={closeModal} type="button" className="me-2 btn btn-secondary">{t('cancel')}</button>
          <button type="submit" className="btn btn-danger">{t('delet')}</button>
        </div>
      </div>
    </form>
  );
};

export default RemoveChannelModal;
