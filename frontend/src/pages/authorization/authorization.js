import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FormAuth from './components/FormAuth.js';
import Header from '../commonСomponents/Header.js';

const Authorization = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src="./img/authorization.jpg" className="rounded-circle img-thumbnail mt-5" alt="Войти" />
                </div>
                <FormAuth />
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{t('notAccount')}</span>
                  <Link to="/signup">{t('signUp')}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
