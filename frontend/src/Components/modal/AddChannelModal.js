/* eslint-disable no-param-reassign */
import { useTranslation } from 'react-i18next';
import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { useFormik } from 'formik';
import filter from 'leo-profanity';
import { WaitSwitchChanellOn } from '../../store/chatSlice.js';
import {
  modalSwitch,
} from '../../store/modalSlice.js';
import validator from '../validator.js';
import { ToastNewChannel } from '../toasts.js';
import SocketContext from '../SocketContext.js';
import getLanguage from '../getLanguage.js';

const AddChannelModal = () => {
  const { t } = useTranslation();
  const { socket } = useContext(SocketContext);
  const { channels } = useSelector((state) => state.chat);
  const NameChannelsArr = channels.map((elem) => elem.name);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(modalSwitch(false));
  };
  const [errorlog, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      setError('');
      const lng = getLanguage(values.name);
      filter.loadDictionary(lng);
      if (filter.check(values.name)) {
        setError('badWord');
      } else {
        validator(NameChannelsArr, values.name)
          .then(() => {
            dispatch(WaitSwitchChanellOn());
            socket.emit('newChannel', { name: values.name });
            ToastNewChannel();
            closeModal();
            values.name = '';
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
          name="name"
          id="name"
          className={cn('mb-2', 'form-control', { 'is-invalid': errorlog !== '' })}
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <label className="visually-hidden" htmlFor="name">{t('nameChannel')}</label>
        <div className="invalid-feedback">{t(`error.${errorlog}`)}</div>
        <div className="d-flex justify-content-end">
          <button onClick={closeModal} type="button" className="me-2 btn btn-secondary">{t('cancel')}</button>
          <button type="submit" className="btn btn-primary">{t('send')}</button>
        </div>
      </div>
    </form>
  );
};

export default AddChannelModal;
