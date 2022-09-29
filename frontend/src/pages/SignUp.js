import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import i18n from 'i18next';
import cn from 'classnames';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  validateUsername,
  validatePassword,
  validateConfirmPassword,
} from '../Components/validator.js';
import { signIn } from '../store/usersSlice.js';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [valid, setValid] = useState({
    errorName: 'none',
    errorPassword: 'none',
    errorConfirmPassword: 'none',
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      if (valid.errorName === 'none'
      && valid.errorPassword === 'none'
      && valid.errorConfirmPassword === 'none') {
        axios.post('/api/v1/signup', { username: values.username, password: values.password })
          .then((res) => {
            const { token, username } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('login', username);
            dispatch(signIn({
              login: username,
              token,
            }));
            navigate('/');
          })
          .catch((err) => {
            if (err.response.status === 409) {
              const newValid = { ...valid };
              newValid.errorName = 'cloneLogin';
              setValid(newValid);
            }
          });
      }
    },
  });

  const validUsername = () => {
    validateUsername(formik.values.username)
      .then(() => {
        const newValid = { ...valid };
        newValid.errorName = 'none';
        setValid(newValid);
      })
      .catch((err) => {
        const newValid = { ...valid };
        newValid.errorName = err.message;
        setValid(newValid);
      });
  };

  const validPassword = () => {
    validatePassword(formik.values.password)
      .then(() => {
        const newValid = { ...valid };
        newValid.errorPassword = 'none';
        setValid(newValid);
      })
      .catch((err) => {
        const newValid = { ...valid };
        newValid.errorPassword = err.message;
        setValid(newValid);
      });
  };

  const validConfirmPassword = () => {
    validateConfirmPassword(formik.values.password, formik.values.confirmPassword)
      .then(() => {
        const newValid = { ...valid };
        newValid.errorConfirmPassword = 'none';
        setValid(newValid);
      })
      .catch((err) => {
        const newValid = { ...valid };
        newValid.errorConfirmPassword = err.message;
        setValid(newValid);
      });
  };

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link to="/" className="navbar-brand">{i18n.t('logo')}</Link>
        </div>
      </nav>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div>
                  <img src="./img/registration.jpg" className="rounded-circle" alt="Регистрация" />
                </div>
                <form className="w-50" onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">{i18n.t('signUp')}</h1>
                  <div className="form-floating mb-3">
                    <input
                      placeholder="Логин"
                      name="username"
                      required=""
                      id="username"
                      className={cn('form-control', { 'is-invalid': valid.errorName !== 'none' })}
                      onChange={formik.handleChange}
                      onBlur={validUsername}
                      value={formik.values.username}
                    />
                    <label className="form-label" htmlFor="username">{i18n.t('youNick')}</label>
                    <div className="invalid-tooltip">{i18n.t(`errorlogin.${valid.errorName}`)}</div>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      name="password"
                      aria-describedby="passwordHelpBlock"
                      required=""
                      type="password"
                      id="password"
                      className={cn('form-control', { 'is-invalid': valid.errorPassword !== 'none' })}
                      onChange={formik.handleChange}
                      onBlur={validPassword}
                      value={formik.values.password}
                    />
                    <div className="invalid-tooltip">{i18n.t(`errorPassword.${valid.errorPassword}`)}</div>
                    <label className="form-label" htmlFor="password">{i18n.t('password')}</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      name="confirmPassword"
                      required=""
                      type="password"
                      id="confirmPassword"
                      className={cn('form-control', { 'is-invalid': valid.errorConfirmPassword !== 'none' })}
                      onChange={formik.handleChange}
                      onBlur={validConfirmPassword}
                      value={formik.values.confirmPassword}
                    />
                    <div className="invalid-tooltip">{i18n.t(`errorConfirmPassword.${valid.errorConfirmPassword}`)}</div>
                    <label className="form-label" htmlFor="confirmPassword">{i18n.t('confirmPassword')}</label>
                  </div>
                  <button type="submit" className="w-100 btn btn-outline-primary">{i18n.t('register')}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
