import React, { useEffect, useState, useMemo, createContext } from 'react';
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

import { isAuthenticated } from '../pages/components/auth/helpers';
import ManageSite from '../globalcontext/manageSite';
import { ProfileContext } from '../dashboard/components/context/ProfileContext';

import { StateProvider } from '../dashboard/components/context/store';
import { PostStateProvider } from '../dashboard/components/context/postStore';

const DashboardLayout = ({
  title = 'Title',
  description = 'Description',
  children,
  ...rest
}) => {
  //const {name, email} = isAuthenticated();

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.dir('componentDidMount');
  }, [profile]);

  useEffect(() => {
    (() => {
      getCurrentProfile();
    })();
  }, []);

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

      // setProfile({
      //   bio,
      //   city,
      //   country,
      //   dob,
      //   handle,
      //   location,
      //   status,
      //   skills,
      //   name,
      //   email,
      //   youtube,
      //   linkedin,
      //   kingschat,
      //   facebook
      // });
      setLoading(false);
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

      setError('');
    } catch (err) {
      setError(err.response);
      console.log('SIGNUP ERROR', err.response);

      setLoading(false);
      setProfile(null);
    }
  };

  const providerProfile = useMemo(() => ({ profile, setProfile }), [
    profile,
    setProfile
  ]);

  // return loading && profile === null ? <Spinner/>:<Fragment>test</Fragment>
  return (
    <StateProvider>
      <ProfileContext.Provider value={providerProfile}>
        <PostStateProvider>
          <div className="page page-dashboard">
            <GlobalHeader />
            <main id="user-dashboard">
              <Router>
                <ManageSite>
                  <section className="user-main">
                    <Aside className="user-aside left-bar">
                      <LeftContent />
                    </Aside>
                    <Main className="main-content">{children}</Main>
                    <Aside className="user-aside right-bar">
                      <TopBar />
                      <header className="header">
                        <h3>Schedule</h3>
                      </header>
                      <RightContent />
                      <Log value={profile} />
                    </Aside>
                  </section>
                </ManageSite>
              </Router>
            </main>
          </div>
        </PostStateProvider>
      </ProfileContext.Provider>
    </StateProvider>
  );
};

export default DashboardLayout;
