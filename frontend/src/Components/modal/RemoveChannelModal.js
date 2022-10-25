/* eslint-disable no-param-reassign */
import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeChannel } from '../../store/channelSlice.js';
import {
  modalState,
  modalSwitch,
} from '../../store/modalSlice.js';
import { toastRemoveChannel } from '../toasts.js';
import { getSocketContext } from '../SocketProvider.js';

const RemoveChannelModal = () => {
  const { t } = useTranslation();
  const { delChannel } = useContext(getSocketContext);
  const { idChannel } = useSelector(modalState);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(modalSwitch(false));
  };

  const submit = () => {
    delChannel(idChannel);
    dispatch(removeChannel(idChannel));
    toastRemoveChannel();
    closeModal();
  };

  return (
    <form className="">
      <div>
        <p className="lead">{t('deletLead')}</p>
        <div className="d-flex justify-content-end">
          <button onClick={closeModal} type="button" className="me-2 btn btn-secondary">{t('cancel')}</button>
          <button onClick={submit} type="button" className="btn btn-danger">{t('delet')}</button>
        </div>
      </div>
    </form>
  );
};

export default RemoveChannelModal;
