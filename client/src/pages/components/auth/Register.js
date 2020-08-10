import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { isAuthenticated } from './helpers';

import Log from '../../shared/Log';

import './Register.css';

const Register = () => {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    buttonText: 'Register'
  });

  const { name, email, password, password2, buttonText } = formData;

  const handleChange = (name) => (event) => {
    console.log(event.target.value);

    setFormData({ ...formData, [name]: event.target.value });
  };

  const clickSubmit = async (event) => {
    event.preventDefault();
    setFormData({ ...formData, buttonText: 'Sending' });
    if (password !== password2) {
      console.log('Passwords do not match');
      setError('Passwords do not match');
      toast.error('Passwords do not match', {
        fontSize: '3.625rem',
        fontWeight: 'bold',
        autoClose: 10000
      });
    } else {
      console.log(formData);
      const newUser = {
        name,
        email,
        password
      };

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const body = JSON.stringify(newUser);
        const res = await axios.post('/api/auth/signup', body, config);
        console.log('RESULT:  ', res);
        setFormData({
          ...formData,
          name: '',
          email: '',
          password: '',
          password2: '',
          buttonText: 'Registered'
        });
        setError('');
        toast.success(res.data.msg);
      } catch (err) {
        console.log('SIGNUP ERROR', err.response.data.error);
        setError(err.response.data.error);
        setFormData({ ...formData, buttonText: 'Register' });
        toast.error(err.response.data.error, {
          fontSize: '1.625rem',
          fontWeight: 'bold',
          autoClose: 10000
        });
      }
    }
  };

  const registerForm = () => (
    <form className="register">
      <fieldset>
        <div className="form-row">
          <h4
            style={{
              color: '#D71121',
              fontSize: '1.425rem',
              fontWeight: '600'
            }}
          >
            {error}
          </h4>
          <div className="form-field">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              onChange={handleChange('name')}
              value={name}
              name="name"
              required
              placeholder="Please enter your full name"
              autoComplete="off"
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              onChange={handleChange('email')}
              value={email}
              name="email"
              required
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
          <div className="form-field">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              onChange={handleChange('password2')}
              value={password2}
              name="password2"
              required
              placeholder="Please confirm the password above"
              autoComplete="off"
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="register-submit-btn">
        <div className="form-row">
          <div className="form-field">
            <button
              className="registerBtn"
              type="submit"
              name="register"
              onClick={clickSubmit}
            >
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
        className="container register-container"
        style={{
          paddingTop: '9.4rem',
          paddingBottom: '6rem',
          display: 'block'
        }}
      >
        <section id="register-masthead" className="flex in-view">
          <h1 className="title">Register</h1>
          <p>Create an account.</p>
        </section>
        <div className="user-register in-view">
          <ToastContainer />
          {isAuthenticated() ? <Redirect to="/dashboard" /> : null}
          {registerForm()}

          {/* <Log value={formData} /> */}
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
