import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Link, Redirect } from 'react-router-dom';

import Log from '../../shared/Log';

import './Login.scss';

const Reset = ({ match }) => {
  const [formData, setFormData] = useState({
    name: '',
    token: '',
    newPassword: '',
    buttonText: 'Request Password'
  });

  useEffect(() => {
    let token = match.params.token;

    let { name } = jwt.decode(token);

    if (token) {
      setFormData({ ...formData, name, token });
    }
  }, []);

  const { name, token, newPassword, buttonText } = formData;

  const handleChange = (event) => {
    setFormData({ ...formData, newPassword: event.target.value });
  };

  const clickSubmit = async (event) => {
    event.preventDefault();
    setFormData({ ...formData, buttonText: 'Submitting' });

    axios({
      method: 'PUT',
      url: `/api/auth/reset-password`,
      data: { newPassword, resetPasswordLink: token }
    })
      .then((response) => {
        console.log('FORGOT PASSWORD SUCCESS', response);
        toast.success(response.data.message);
        setFormData({ ...formData, buttonText: 'Done' });
      })
      .catch((error) => {
        console.log('FORGOT PASSWORD ERROR', error.response.data.error);
        toast.error(error.response.data.error);
        setFormData({ ...formData, buttonText: 'Reset Password' });
      });
  };

  const resetPasswordForm = () => (
    <form className="register">
      <fieldset>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="email">New Password</label>
            <input
              type="password"
              onChange={handleChange}
              value={newPassword}
              name="newPassword"
              placeholder="Please enter your new password"
              autoComplete="off"
              required
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="login-submit-btn">
        <div className="form-row">
          <div className="form-field">
            <h3>Hey {name}, Type your new password</h3>
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
        <section id="login-masthead" className="flex in-view">
          <h1 className="title">Forgot Password</h1>
        </section>
        <div className="user-login in-view">{resetPasswordForm()}</div>
      </div>
    </Fragment>
  );
};

export default Reset;
