import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Authorization from './pages/authorization/authorization.js';
import ChatPage from './pages/Chat/ChatPage.js';
import SignUp from './pages/SignUp/SignUp.js';
import NotFound from './pages/NotFound/NotFound.js';
import './App.css';
import './scrollStyle.css';
import { userState } from './store/userSlice.js';

const rollbarConfig = {
  accessToken: process.env.ACCESS_TOKEN,
  environment: 'production',
};

const App = () => {
  const localToken = localStorage.getItem('token');
  const { token } = useSelector(userState);
  return (
    <>
      <Provider config={rollbarConfig}>
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={token !== '' || localToken !== null ? <ChatPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={token !== '' || localToken !== null ? <Navigate to="/" /> : <Authorization />}
            />
            <Route
              path="/signup"
              element={token !== '' || localToken !== null ? <Navigate to="/" /> : <SignUp />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </Provider>
      <ToastContainer />
    </>
  );
};

export default App;
