import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import i18n from 'i18next';
import cn from 'classnames';
import { signIn } from '../store/userSlice.js';

const Authorization = () => {
  const dispatch = useDispatch();
  const [logErr, setLogErr] = useState('none');
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      axios.post('/api/v1/login', { username: values.username, password: values.password })
        .then((res) => {
          setLogErr('none');
          const { token, username } = res.data;
          localStorage.setItem('token', token);
          localStorage.setItem('login', username);
          dispatch(signIn({
            login: username,
            token,
          }));
        })
        .catch((err) => {
          if (err.response.status) { setLogErr('UnknownUser'); }
        });
    },
  });

  const form = () => (
    <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{i18n.t('enter')}</h1>
      <div className="form-floating mb-3">
        <input
          onChange={formik.handleChange}
          value={formik.values.username}
          name="username"
          required
          placeholder="Ваш ник"
          id="username"
          className={cn('form-control', { 'is-invalid': logErr !== 'none' })}
        />
        <label htmlFor="username">{i18n.t('youNick')}</label>
        <div className="invalid-tooltip">{i18n.t(`errorlogin.${logErr}`)}</div>
      </div>
      <div className="form-floating mb-4">
        <input
          onChange={formik.handleChange}
          value={formik.values.password}
          name="password"
          required
          placeholder="Пароль"
          type="password"
          id="password"
          className="form-control"
        />
        <label className="form-label" htmlFor="password">{i18n.t('password')}</label>
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{i18n.t('enter')}</button>
    </form>
  );
  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link to="/" className="navbar-brand">{i18n.t('logo')}</Link>
        </div>
        <div className="Toastify" />
      </nav>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src="./img/authorization.jpg" className="rounded-circle img-thumbnail mt-5" alt="Войти" />
                </div>
                {form()}
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{i18n.t('notAccount')}</span>
                  <Link to="/signup">{i18n.t('signUp')}</Link>
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
