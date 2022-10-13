/* eslint-disable no-param-reassign */
import { useTranslation } from 'react-i18next';
import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { useFormik } from 'formik';
import filter from 'leo-profanity';
import { modalState, modalSwitch } from '../../store/modalSlice.js';
import validator from '../validator.js';
import { ToastRenameChannel } from '../toasts.js';
import SocketContext from '../SocketContext.js';
import getLanguage from '../getLanguage.js';
import { channelState } from '../../store/channelSlice.js';

const RenameChannelModal = () => {
  const { t } = useTranslation();
  const { socket } = useContext(SocketContext);
  const { channels } = useSelector(channelState);
  const { idChannel } = useSelector(modalState);
  const NameChannelsArr = channels.map((elem) => elem.name);
  const dispatch = useDispatch();
  const [errorlog, setError] = useState('');

  const closeModal = () => {
    dispatch(modalSwitch(false));
  };

  const formik = useFormik({
    initialValues: {
      rename: '',
    },
    onSubmit: (values) => {
      const lng = getLanguage(values.name);
      filter.loadDictionary(lng);
      setError('');
      if (filter.check(values.rename)) {
        setError('badWord');
      } else {
        validator(NameChannelsArr, values.rename)
          .then(() => {
            socket.emit('renameChannel', { id: idChannel, name: values.rename });
            values.rename = '';
            ToastRenameChannel();
            closeModal();
          })
          .catch((err) => {
            setError(err.message);
          });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="">
      <div>
        <input
          name="rename"
          id="rename"
          className={cn('mb-2', 'form-control', { 'is-invalid': errorlog !== '' })}
          onChange={formik.handleChange}
          value={formik.values.rename}
        />
        <label className="visually-hidden" htmlFor="rename">{t('nameChannel')}</label>
        <div className="invalid-feedback">{t(`error.${errorlog}`)}</div>
        <div className="d-flex justify-content-end">
          <button onClick={closeModal} type="button" className="me-2 btn btn-secondary">{t('cancel')}</button>
          <button type="submit" className="btn btn-primary">{t('send')}</button>
        </div>
      </div>
    </form>
  );
};

export default RenameChannelModal;
