import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import GlobalHeader from '../pages/shared/header/GlobalHeader';

import Main from '../dashboard/components/Main';
import RightContent from '../dashboard/components/RightContent';
import LeftContent from '../dashboard/components/LeftContent';
import Aside from '../dashboard/components/Aside';
import TopBar from '../dashboard/components/TopBar';

import '../dashboard/Dashboard.css';

import Log from '../pages/shared/Log';

import { getCookie } from '../pages/components/auth/helpers';

const DashboardLayout = ({
  title = 'Title',
  description = 'Description',
  children,
  ...rest
}) => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    console.dir('componentDidMount');
  }, [profile]);
  useEffect(() => {
    getCurrentProfile();
  }, []);

  const {
    bio,
    city,
    country,
    dob,
    handle,
    location,
    skills,
    status,
    name,
    email,
    youtube,
    facebook,
    linkedin,
    kingschat
  } = profile;

  const getCurrentProfile = async () => {
    const token = getCookie('token');
    console.log('TOKEN RECEIVED:   ', token);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const res = await axios.get('/api/user/profile/me', config);

      const {
        bio,
        city,
        country,
        dob,
        handle,
        location,
        status,
        skills,
        user: { email, name },
        social: { youtube, linkedin, kingschat, facebook }
      } = res.data;

      console.log('RESULT:  ', res);

      setProfile({
        ...profile,
        bio,
        city,
        country,
        dob,
        handle,
        location,
        status,
        skills,
        name,
        email,
        youtube,
        linkedin,
        kingschat,
        facebook
      });
    } catch (err) {
      console.log('SIGNUP ERROR', err);
    }
  };

  // return loading && profile === null ? <Spinner/>:<Fragment>test</Fragment>
  return (
    <div className="page page-dashboard">
      <GlobalHeader />
      <main id="user-dashboard">
        <Router>
          <section className="user-main">
            <Aside className="user-aside left-bar">
              <LeftContent />
            </Aside>
            <Main className="main-content">{children}</Main>
            <Aside className="user-aside right-bar">
              <TopBar />
              <header className="header">
                {skills}
                <h3>Schedule by {name}</h3>
              </header>
              <RightContent />
              <Log value={profile} />
            </Aside>
          </section>
        </Router>
      </main>
    </div>
  );
};

export default DashboardLayout;
