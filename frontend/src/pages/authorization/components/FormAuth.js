import React from 'react';
import {
  Formik, Field, ErrorMessage, Form,
} from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { signIn } from '../../../store/userSlice.js';
import { authSchema } from '../../../Components/validator.js';

const FormAuth = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={authSchema}
      onSubmit={(values, action) => {
        axios.post('/api/v1/login', { username: values.username, password: values.password })
          .then((res) => {
            const { token, username } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('login', username);
            dispatch(signIn({
              login: username, token,
            }));
          })
          .catch((err) => {
            if (err.response.status) {
              action.setErrors({ username: 'UnknownUser' });
            }
          });
      }}
    >
      {({ errors }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">{t('enter')}</h1>
          <div className="form-floating mb-3">
            <Field name="username" placeholder="Ваш ник" id="username" className={cn('form-control', { 'is-invalid': errors.username })} />
            <label htmlFor="username">{t('youNick')}</label>
            <ErrorMessage name="username">{() => <div className="invalid-tooltip">{t(`errorlogin.${errors.username}`)}</div>}</ErrorMessage>
          </div>
          <div className="form-floating mb-4">
            <Field type="password" name="password" placeholder="Пароль" id="password" className={cn('form-control', { 'is-invalid': errors.password })} />
            <label className="form-label" htmlFor="password">{t('password')}</label>
            <ErrorMessage name="password">{() => <div className="invalid-tooltip">{t(`errorPassword.${errors.password}`)}</div>}</ErrorMessage>
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('entering')}</button>
        </Form>
      )}
    </Formik>
  );
};
export default FormAuth;
