/* eslint-disable no-param-reassign */
import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import {
  Formik, Field, ErrorMessage, Form,
} from 'formik';
import filter from 'leo-profanity';
import { getChannelsNames } from '../../store/channelSlice.js';
import { modalSwitch } from '../../store/modalSlice.js';
import { modalNameSchema } from '../validator.js';
import { toastNewChannel } from '../toasts.js';
import { getSocketContext } from '../SocketProvider.js';
import getLanguage from '../getLanguage.js';

const AddChannelModal = () => {
  const { t } = useTranslation();
  const { newChannel } = useContext(getSocketContext);
  const сhannelsNames = useSelector(getChannelsNames);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(modalSwitch(false));
  };

  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={modalNameSchema(сhannelsNames)}
      onSubmit={(values, actions) => {
        const lng = getLanguage(values.name);
        filter.loadDictionary(lng);
        if (filter.check(values.name)) {
          actions.setErrors({ name: 'badWord' });
        } else {
          newChannel(values.name);
          toastNewChannel();
          closeModal();
          values.name = '';
        }
      }}
    >
      {({ errors }) => (
        <Form>
          <div>
            <Field name="name" id="name" className={cn('mb-2', 'form-control', { 'is-invalid': errors.name })} />
            <label className="visually-hidden" htmlFor="name">{t('nameChannel')}</label>
            <ErrorMessage name="name">{() => <div className="invalid-feedback">{t(`error.${errors.name}`)}</div>}</ErrorMessage>
            <div className="d-flex justify-content-end">
              <button onClick={closeModal} type="button" className="me-2 btn btn-secondary">{t('cancel')}</button>
              <button type="submit" className="btn btn-primary">{t('send')}</button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddChannelModal;
