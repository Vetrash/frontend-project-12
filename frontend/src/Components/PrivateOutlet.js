import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userState } from '../store/userSlice.js';

const PrivateOutlet = (props) => {
  const { token } = useSelector(userState);
  const localToken = localStorage.getItem('token');
  const isAuth = token !== '' || localToken !== null;
  const { alt } = props;
  return isAuth ? <Outlet /> : alt;
};

export default PrivateOutlet;
