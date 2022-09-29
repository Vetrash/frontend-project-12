import React from 'react';
import i18n from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider, ErrorBoundary } from '@rollbar/react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Authorization from './pages/authorization.js';
import Chat from './pages/Chat.js';
import SignUp from './pages/SignUp.js';
import resources from './resource/index.js';
import Watcher from './Components/watcher.js';
import './App.css';
import './scrollStyle.css';

const rollbarConfig = {
  accessToken: '8e862ee97e2842dda1754ff043dc68b7',
  environment: 'production',
};

const App = (props) => {
  const { socket } = props;
  i18n
    .use(intervalPlural)
    .init({ lng: 'ru', resources });
  const localToken = localStorage.getItem('token');
  Watcher(socket);
  return (
    <>
      <Provider config={rollbarConfig}>
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={localToken !== null ? <Chat socket={socket} /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={localToken !== null ? <Navigate to="/" /> : <Authorization />}
            />
            <Route
              path="/signup"
              element={localToken !== null ? <Navigate to="/" /> : <SignUp />}
            />
          </Routes>
        </ErrorBoundary>
      </Provider>
      <ToastContainer />
    </>
  );
};

export default App;
