/* eslint-disable no-param-reassign */
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { modalState, modalSwitch } from '../../store/modalSlice.js';
import AddChannelModal from './AddChannelModal.js';
import RemoveChannelModal from './RemoveChannelModal.js';
import RenameChannelModal from './RenameChannelModal.js';
import UnknownErrorModal from './UnknownErrorModal.js';

const RenderModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    modalType,
    isModalShow,
  } = useSelector(modalState);

  const closeModal = () => {
    dispatch(modalSwitch(false));
  };
  const bodyModal = useMemo(() => {
    switch (modalType) {
      case 'add':
        return <AddChannelModal />;
      case 'rename':
        return <RenameChannelModal />;
      case 'remove':
        return <RemoveChannelModal />;
      default:
        return <UnknownErrorModal />;
    }
  });

  const render = (
    <>
      <div className="fade modal-backdrop show" />
      <div role="dialog" aria-modal="true" className="fade modal show dBlock" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{t(`titleModal.${modalType}`)}</div>
              <button onClick={closeModal} type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" />
            </div>
            <div className="modal-body">
              {bodyModal}
            </div>
          </div>
        </div>
      </div>
    </>
  );
  return isModalShow ? render : null;
};

export default RenderModal;
