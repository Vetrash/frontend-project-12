import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { io } from 'socket.io-client';
import store from './store/index.js';
import './index.css';
import App from './App.js';

// import Watcher from './Components/watcher.js';

const socket = io();
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
