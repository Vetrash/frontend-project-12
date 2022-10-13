import { useTranslation } from 'react-i18next';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const { t } = useTranslation();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link to="/" className="navbar-brand">{t('logo')}</Link>
      </div>
    </nav>
  );
};
export default Header;
