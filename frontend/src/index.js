import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { io } from 'socket.io-client';
import store from './store/index.js';
import './index.css';
import i18n from './i18n.js';
import App from './App.js';
import {
  addMessages,
  addChannel,
  removeChannel,
  renameChannel,
  setChannel,
} from './store/chatSlice.js';
import SocketProvider from './Components/SocketProvider.js';

const socket = io();

const watchingSocet = () => {
  socket.once('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
    store.dispatch(setChannel(payload.id));
  });
  socket.on('newMessage', (payload) => {
    store.dispatch(addMessages(payload));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel(payload));
  });
};
watchingSocet();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <SocketProvider>
      <Provider store={store}>
        <Router>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </Router>
      </Provider>
    </SocketProvider>
  </React.StrictMode>,
);
