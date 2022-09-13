import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'


function Authorization() {

 
  const ValidateLogin = yup.object({
    username: yup.string()
      .trim()
      .required(),
    password: yup.string()
      .required()
      .min(6),
  });


  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      onSubmit: async (values) => {
               
    }}
  });

  const form = () => {
   return (
      <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
        <h1 className="text-center mb-4">Войти</h1>
        <div className="form-floating mb-3">
          <input
            onChange={formik.handleChange}
            value={formik.values.username}
            name="username"
            required
            placeholder="Ваш ник"
            id="username"
            className="form-control"
          />
          <label htmlFor="username">Ваш ник</label>
        </div>

        <div className="form-floating mb-4">
          <input
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            required
            placeholder="Пароль"
            type="password"
            id="password"
            className="form-control"
          />
          <label className="form-label" htmlFor="password">Пароль</label>
        </div>
        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
      </form>
    )    
  }

    return (
        <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">Hexlet chat</a>
          </div>
          <div className="Toastify"></div>
        </nav>
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img src="./img/authorization.jpg" className="rounded-circle img-thumbnail mt-5" alt="Войти"/>
                    </div>
                    {form()}
                      </div>
                      <div className="card-footer p-4">
                        <div className="text-center">
                          <span>Нет аккаунта?</span>
                          <Link to="/signup">Регистрация</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    );
  }
  
  export default Authorization;