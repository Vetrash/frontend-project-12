import React from 'react';
import FormSignUp from './components/FormSignUp.js';
import Header from '../commonСomponents/Header.js';

const SignUp = () => (
  <div className="d-flex flex-column h-100">
    <Header />
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src="./img/registration.jpg" className="rounded-circle" alt="Регистрация" />
              </div>
              <FormSignUp />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SignUp;
