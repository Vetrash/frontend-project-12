/* eslint-disable no-param-reassign */
import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import {
  Formik, Field, ErrorMessage, Form,
} from 'formik';
import filter from 'leo-profanity';
import { modalState, modalSwitch } from '../../store/modalSlice.js';
import { modalRenameSchema } from '../validator.js';
import { toastRenameChannel } from '../toasts.js';
import { getSocketContext } from '../SocketProvider.js';
import getLanguage from '../getLanguage.js';
import { channelState } from '../../store/channelSlice.js';

const RenameChannelModal = () => {
  const { t } = useTranslation();
  const { renameChannel } = useContext(getSocketContext);
  const { channels } = useSelector(channelState);
  const { idChannel } = useSelector(modalState);
  const NameChannelsArr = channels.map((elem) => elem.name);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(modalSwitch(false));
  };

  return (
    <Formik
      initialValues={{ rename: '' }}
      validationSchema={modalRenameSchema(NameChannelsArr)}
      onSubmit={(values, actions) => {
        const lng = getLanguage(values.rename);
        filter.loadDictionary(lng);
        if (filter.check(values.rename)) {
          actions.setErrors({ rename: 'badWord' });
        } else {
          renameChannel(idChannel, values.rename);
          toastRenameChannel();
          closeModal();
          values.rename = '';
        }
      }}
    >
      {({ errors }) => (
        <Form>
          <div>
            <Field name="rename" id="rename" className={cn('mb-2', 'form-control', { 'is-invalid': errors.rename })} />
            <label className="visually-hidden" htmlFor="rename">{t('nameChannel')}</label>
            <ErrorMessage name="rename">{() => <div className="invalid-feedback">{t(`error.${errors.rename}`)}</div>}</ErrorMessage>
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

export default RenameChannelModal;
