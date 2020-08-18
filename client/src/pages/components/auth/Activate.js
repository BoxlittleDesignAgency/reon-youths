import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Link, Redirect, withRouter } from 'react-router-dom';

import { authenticate, isAuthenticated } from './helpers';

import Log from '../../shared/Log';

import './Login.scss';

const Activate = ({ history, match }) => {
  const [values, setValues] = useState({
    name: '',
    token: '',
    show: true
  });

  useEffect(() => {
    let token = match.params.token;

    let { name } = jwt.decode(token);

    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token, show } = values;

  const clickSubmit = async (event) => {
    event.preventDefault();
    axios({
      method: 'POST',
      url: `/api/auth/account-activation`,
      data: { token }
    })
      .then((response) => {
        console.log('ACCOUNT ACTIVATION', response);
        setValues({ ...values, show: false });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log('ACCOUNT ACTIVATION ERROR', error.response.data.error);
        toast.error(error.response.data.error);
      });
  };

  const activationLink = () => (
    <div>
      <h3> Hey {name}, Are you ready to ativate your account?</h3>
      <div className="centre-cta fadeIn">
        <button className="reonBtn" onClick={clickSubmit}>
          Activate Account
        </button>
      </div>
    </div>
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
          <h1 className="title">Activate your Account</h1>
        </section>
        <div className="user-login in-view">
        {activationLink()}

          {/* <Log value={formData} /> */}
        </div>
      </div>
    </Fragment>
   );
};

export default withRouter(Activate);
