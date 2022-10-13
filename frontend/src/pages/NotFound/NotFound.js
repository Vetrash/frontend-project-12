import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import React from 'react';
import Header from '../commonСomponents/Header.js';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <Header />
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
