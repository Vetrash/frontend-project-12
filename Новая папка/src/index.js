import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'
import store from './store/index.js'
import './index.css';
import App from './App';
import Authorization from './pages/authorization.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router path="/login">
      <Routes>
            <Route path="/" element={<Authorization />}/>
            <Route path="/login" element={<Authorization />}/>
            <Route path="/" element={<App />}/>
      </Routes>
    </Router>
    
    
    </Provider>
    
  </React.StrictMode>
);


