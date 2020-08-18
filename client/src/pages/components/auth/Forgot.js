import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Link, Redirect } from 'react-router-dom';

import Log from '../../shared/Log';

import './Login.scss';

const Forgot = ({ history }) => {
  const [formData, setFormData] = useState({
    email: '',
    buttonText: 'Request Password Reset Link'
  });

  const { email, buttonText } = formData;

  const handleChange = (name) => (event) => {
    console.log(event.target.value);
    setFormData({ ...formData, [name]: event.target.value });
  };

  const clickSubmit = async (event) => {
    event.preventDefault();
    setFormData({...formData, buttonText: "Submitting"})
    axios({
      method: 'PUT',
      url: `/api/auth/forgot-password`,
      data: { email }
    })
      .then((response) => {
        console.log('FORGOT PASSWORD SUCCESS', response);
        toast.success(response.data.message);
        setFormData({ ...formData, buttonText: "Requested" });
      })
      .catch((error) => {
        console.log('FORGOT PASSWORD ERROR', error.response.data.error);
        toast.error(error.response.data.error);
        setFormData({ ...formData, buttonText: "Request Password Reset Link" });
      });
  };

  const forgotPasswordForm = () => (
    <form className="register">
      <fieldset>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              onChange={handleChange('email')}
              value={email}
              name="email"
              placeholder="Please enter your email address"
              autoComplete="off"
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="login-submit-btn">
        <div className="form-row">
          <div className="form-field">
            <button className="loginBtn" type="submit" onClick={clickSubmit}>
              {buttonText}
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  );

  return (
    <Fragment>
      <div
        className="container login-container"
        style={{
          paddingTop: '9.4rem',
          paddingBottom: '6rem',
          display: 'block'
        }}
      >
        <ToastContainer />
        <section id="login-masthead" className="in-view">
          <h2 className="h2">Password reset</h2>
          <p id="forgotMessage">We’ll email you instructions to reset your password.</p>
        </section>
        <div className="user-login in-view">
          {forgotPasswordForm()}

          {/* <Log value={formData} /> */}
        </div>
      </div>
    </Fragment>
  );
};

export default Forgot;
