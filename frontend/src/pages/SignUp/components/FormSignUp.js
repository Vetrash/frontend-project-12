import {
  Formik, Field, ErrorMessage, Form,
} from 'formik';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { SignupSchema } from '../../../Components/validator.js';
import { signIn } from '../../../store/userSlice.js';

const FormSignUp = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
        axios.post('/api/v1/signup', { username: values.username, password: values.password })
          .then((res) => {
            const { token, username } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('login', username);
            dispatch(signIn({ login: username, token }));
          })
          .catch((err) => {
            if (err.response.status === 409) {
              actions.setErrors({ username: 'cloneLogin' });
            }
          });
      }}
    >
      {({ errors }) => (
        <Form className="w-50">
          <h1 className="text-center mb-4">{t('signUp')}</h1>
          <div className="form-floating mb-3">
            <Field type="username" name="username" placeholder="Логин" className={cn('form-control', { 'is-invalid': errors.username })} />
            <label className="form-label" htmlFor="username">{t('nameUser')}</label>
            <ErrorMessage name="username">{() => <div className="invalid-tooltip">{t(`errorlogin.${errors.username}`)}</div>}</ErrorMessage>
          </div>
          <div className="form-floating mb-3">
            <Field type="password" name="password" className={cn('form-control', { 'is-invalid': errors.password })} />
            <label className="form-label" htmlFor="password">{t('password')}</label>
            <ErrorMessage name="password">{() => <div className="invalid-tooltip">{t(`errorPassword.${errors.password}`)}</div>}</ErrorMessage>
          </div>
          <div className="form-floating mb-4">
            <Field type="password" name="confirmPassword" className={cn('form-control', { 'is-invalid': errors.confirmPassword })} />
            <label className="form-label" htmlFor="confirmPassword">{t('confirmPassword')}</label>
            <ErrorMessage name="confirmPassword">{() => <div className="invalid-tooltip">{t(`errorConfirmPassword.${errors.confirmPassword}`)}</div>}</ErrorMessage>
          </div>
          <button type="submit" className="w-100 btn btn-outline-primary mb-3">{t('register')}</button>
          <Link to="/" className="text-center d-block">{t('onMainPage')}</Link>
        </Form>
      )}
    </Formik>
  );
};

export default FormSignUp;
