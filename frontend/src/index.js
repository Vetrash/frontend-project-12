import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { io } from 'socket.io-client';
import store from './store/index.js';
import './index.css';
import App from './App.js';
import {
  addMessages,
  addChannel,
  removeChannel,
  renameChannel,
  setChannel,
} from './store/chatSlice.js';


const Watcher = () => {
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



const socket = io();
Watcher();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App socket={socket} />
      </Router>
    </Provider>
  </React.StrictMode>,
);
