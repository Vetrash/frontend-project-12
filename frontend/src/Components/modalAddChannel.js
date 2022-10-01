/* eslint-disable no-param-reassign */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import i18n from 'i18next';
import { useFormik } from 'formik';
import filter from 'leo-profanity';
import {
  setChannel,
  removeChannel,
  onWaitSwitchChanell,
} from '../store/chatSlice.js';
import {
  setErrorLog,
  modalSwitch,
} from '../store/modalSlice.js';
import validator from './validator.js';
import {
  ToastNewChannel,
  ToastRenameChannel,
  ToastRemoveChannel,
} from './toasts.js';

const RenderModal = (socket) => {
  const regex = /^[\u0400-\u04FF]+$/;

  const { activChatId, idSelectedChannel, NameChannelsArr } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const {
    modalType,
    errorPlace,
    errorlog,
    modalShow,
  } = useSelector((state) => state.modal);

  const closeModal = () => {
    dispatch(modalSwitch(false));
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      rename: '',
    },
    onSubmit: (values) => {
      const lngName = regex.test(values.name) ? 'ru' : 'en';
      const lngRename = regex.test(values.rename) ? 'ru' : 'en';
      switch (modalType) {
        case 'add':
          filter.loadDictionary(lngName);
          if (filter.check(values.name)) {
            dispatch(setErrorLog({ log: 'badWord', place: 'add' }));
          } else {
            validator(NameChannelsArr, values.name)
              .then(() => {
                dispatch(onWaitSwitchChanell());
                // eslint-disable-next-line react/destructuring-assignment
                socket.emit('newChannel', { name: values.name });
                values.name = '';
                ToastNewChannel();
                closeModal();
                dispatch(setErrorLog({ log: 'none', place: 'none' }));
              })
              .catch((err) => {
                dispatch(setErrorLog({ log: err.message, place: 'add' }));
              });
          }
          break;
        case 'remove':
          if (idSelectedChannel === activChatId) {
            dispatch(setChannel(1));
          }
          // eslint-disable-next-line react/destructuring-assignment
          socket.emit('removeChannel', { id: idSelectedChannel });
          dispatch(removeChannel(idSelectedChannel));
          ToastRemoveChannel();
          closeModal();
          break;
        case 'rename':
          filter.loadDictionary(lngRename);
          if (filter.check(values.rename)) {
            dispatch(setErrorLog({ log: 'badWord', place: 'rename' }));
          } else {
            validator(NameChannelsArr, values.rename)
              .then(() => {
                // eslint-disable-next-line react/destructuring-assignment
                socket.emit('renameChannel', { id: idSelectedChannel, name: values.rename });
                values.rename = '';
                ToastRenameChannel();
                closeModal();
                dispatch(setErrorLog({ log: 'none', place: 'none' }));
              })
              .catch((err) => {
                dispatch(setErrorLog({ log: err.message, place: 'rename' }));
              });
          }
          break;
        default:
          closeModal();
          break;
      }
    },
  });

  const bodyModal = () => {
    switch (modalType) {
      case 'add':
        return (
          <form onSubmit={formik.handleSubmit} className="">
            <div>
              <input
                name="name"
                id="name"
                className={cn('mb-2', 'form-control', { 'is-invalid': errorPlace === 'add' })}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <label className="visually-hidden" htmlFor="name">{i18n.t('nameChannel')}</label>
              <div className="invalid-feedback">{i18n.t(`error.${errorlog}`)}</div>
              <div className="d-flex justify-content-end">
                <button onClick={closeModal} type="button" className="me-2 btn btn-secondary">{i18n.t('cancel')}</button>
                <button type="submit" className="btn btn-primary">{i18n.t('send')}</button>
              </div>
            </div>
          </form>
        );
      case 'rename':
        return (
          <form onSubmit={formik.handleSubmit} className="">
            <div>
              <input
                name="rename"
                id="rename"
                className={cn('mb-2', 'form-control', { 'is-invalid': errorPlace === 'rename' })}
                onChange={formik.handleChange}
                value={formik.values.rename}
              />
              <label className="visually-hidden" htmlFor="rename">{i18n.t('nameChannel')}</label>
              <div className="invalid-feedback">{i18n.t(`error.${errorlog}`)}</div>
              <div className="d-flex justify-content-end">
                <button onClick={closeModal} type="button" className="me-2 btn btn-secondary">{i18n.t('cancel')}</button>
                <button type="submit" className="btn btn-primary">{i18n.t('send')}</button>
              </div>
            </div>
          </form>
        );
      case 'remove':
        return (
          <form onSubmit={formik.handleSubmit} className="">
            <div>
              <p className="lead">{i18n.t('deletLead')}</p>
              <div className="d-flex justify-content-end">
                <button onClick={closeModal} type="button" className="me-2 btn btn-secondary">{i18n.t('cancel')}</button>
                <button type="submit" className="btn btn-danger">{i18n.t('delet')}</button>
              </div>
            </div>
          </form>
        );
      default:
        return (
          <form onSubmit={formik.handleSubmit} className="">
            <div>
              <p className="lead">{i18n.t('unknownError')}</p>
              <div className="d-flex justify-content-end">
                <button onClick={closeModal} type="button" className="me-2 btn btn-secondary">{i18n.t('cancel')}</button>
              </div>
            </div>
          </form>
        );
    }
  };

  const render = (
    <>
      <div className="fade modal-backdrop show" />
      <div role="dialog" aria-modal="true" className="fade modal show dBlock" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{i18n.t(`titleModal.${modalType}`)}</div>
              <button onClick={closeModal} type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" />
            </div>
            <div className="modal-body">
              {bodyModal()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
  return modalShow ? render : '';
};

export default RenderModal;
