import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Authorization from './pages/authorization/authorization.js';
import ChatPage from './pages/Chat/ChatPage.js';
import SignUp from './pages/SignUp/SignUp.js';
import NotFound from './pages/NotFound/NotFound.js';
import './App.css';
import './scrollStyle.css';
import PrivateOutlet from './Components/PrivateOutlet.js';

const rollbarConfig = {
  accessToken: process.env.ACCESS_TOKEN,
  environment: 'production',
};

const App = () => (
  <>
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<PrivateOutlet alt={<Navigate to="/login" />} />}>
            <Route path="/" element={<ChatPage />} />
          </Route>

          <Route path="/login" element={<PrivateOutlet alt={<Authorization />} />}>
            <Route path="/login" element={<Navigate to="/" />} />
          </Route>

          <Route path="/signup" element={<PrivateOutlet alt={<SignUp />} />}>
            <Route path="/signup" element={<Navigate to="/" />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Provider>
    <ToastContainer />
  </>
);

export default App;
