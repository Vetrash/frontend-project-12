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
  setErrorLog,
  setErrorPlace,
  modalSwitch,
} from '../store/usersSlice.js';
import validator from './validator.js';

const RenderModal = (socket) => {
  filter.loadDictionary('ru');
  const { activChatId, idSelectedChannel } = useSelector((state) => state.users);
  const { NameChannelsArr } = useSelector((state) => state.users.data);
  const dispatch = useDispatch();
  const { UI } = useSelector((state) => state.users);
  const { modalType, errorPlace, errorlog } = useSelector((state) => state.users.UI);

  const closeModal = () => {
    dispatch(modalSwitch(false));
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      rename: '',
    },
    onSubmit: (values) => {
      switch (modalType) {
        case 'add':
          if (filter.check(values.name)) {
            dispatch(setErrorLog('badWord'));
            dispatch(setErrorPlace('add'));
          } else {
            validator(NameChannelsArr, values.name)
              .then(() => {
              // eslint-disable-next-line react/destructuring-assignment
                socket.emit('newChannel', { name: values.name });
                values.name = '';
                closeModal();
                dispatch(setErrorLog('none'));
                dispatch(setErrorPlace('none'));
              })
              .catch((err) => {
                dispatch(setErrorLog(err.message));
                dispatch(setErrorPlace('add'));
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
          closeModal();
          break;
        case 'rename':
          if (filter.check(values.rename)) {
            dispatch(setErrorLog('badWord'));
            dispatch(setErrorPlace('rename'));
          } else {
            validator(NameChannelsArr, values.rename)
              .then(() => {
                // eslint-disable-next-line react/destructuring-assignment
                socket.emit('renameChannel', { id: idSelectedChannel, name: values.rename });
                values.rename = '';
                closeModal();
                dispatch(setErrorLog('none'));
                dispatch(setErrorPlace('none'));
              })
              .catch((err) => {
                dispatch(setErrorLog(err.message));
                dispatch(setErrorPlace('rename'));
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

  let render = '';
  if (UI.modalShow) {
    render = (
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
  }
  return render;
};

export default RenderModal;
