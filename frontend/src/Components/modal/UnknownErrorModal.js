import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { modalSwitch } from '../../store/modalSlice.js';

const UnknownErrorModal = () => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(modalSwitch(false));
  };
  const { t } = useTranslation();
  return (
    <form className="">
      <div>
        <p className="lead">{t('unknownError')}</p>
        <div className="d-flex justify-content-end">
          <button onClick={closeModal} type="button" className="me-2 btn btn-secondary">{t('cancel')}</button>
        </div>
      </div>
    </form>
  );
};

export default UnknownErrorModal;
