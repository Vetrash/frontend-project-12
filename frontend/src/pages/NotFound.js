// import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import React from 'react';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link to="/" className="navbar-brand">{t('logo')}</Link>
        </div>
      </nav>
      <div className="text-center">
        <img alt={t('pageNotFound')} className="img-fluid h-25" src="./img/404.svg" />
        <h1 className="h4 text-muted">{t('pageNotFound')}</h1>
        <p className="text-muted">
          {t('goTo')}
          <Link to="/">{t('onMainPage')}</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
