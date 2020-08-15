import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Link, Redirect } from 'react-router-dom';

import { authenticate, isAuthenticated } from './helpers';

import Log from '../../shared/Log';

import './Login.css';

const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    buttonText: 'Login',
    success: false,
    redirectToReferrer: false
  });

  const { email, password, buttonText, success, redirectToReferrer } = formData;

  const handleChange = (name) => (event) => {
    console.log(event.target.value);
    setFormData({ ...formData, [name]: event.target.value });
  };

  const clickSubmit = async (event) => {
    event.preventDefault();
    const registeredUser = {
      email,
      password
    };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const body = JSON.stringify(registeredUser);
      const res = await axios.post('/api/auth/signin', body, config);

      console.log('RESULT:  ', res);

      //save the response (user, token) localStorage/cookie
      authenticate(res, () => {
        setFormData({
          ...formData,
          redirectToReferrer: true,
          buttonText: 'Sent'
        });

        isAuthenticated() && isAuthenticated().role === 'admin'
          ? history.push('/admin/dashboard')
          : history.push('/user/dashboard');
        toast.success(`Hey ${res.data.user.name}, Welcome back!`);
      });
    } catch (err) {
      console.log('SIGNIN ERROR', err.response.data);
      setFormData({ ...formData, buttonText: 'Send' });
      toast.error(err.response.data.error);
    }
  };

  const loginForm = () => (
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
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={handleChange('password')}
              value={password}
              name="password"
              placeholder="Please enter your password"
              autoComplete="off"
            />
          </div>
        </div>
        <h4 className="password-reset">
          <Link to="/auth/password/forgot">Lost password?</Link>
        </h4>
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

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (isAuthenticated() && isAuthenticated().role === 'admin') {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }

    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

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
        {isAuthenticated() ? <Redirect to="/dashboard" /> : null}
        <section id="login-masthead" className="flex in-view">
          <h1 className="title">Login</h1>
          <p>
            Don't have an account?{' '}
            <Link className="all-links" to="/register">
              Register{' '}
            </Link>
          </p>
        </section>
        <div className="user-login in-view">
          {loginForm()}
          {redirectUser()}

          {/* <Log value={formData} /> */}
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
