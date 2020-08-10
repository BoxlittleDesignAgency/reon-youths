import React, { Fragment, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

import { isAuthenticated } from '../../../pages/components/auth/helpers';

import { store } from '../context/store';

import Loader from '../../../pages/shared/loading/Loader';
import Log from '../../../pages/shared/Log';

import Experience from '../Experience';
import Education from '../Education';

const CurrentUserProfile = ({ history }) => {
  const { profile, loading, getCurrentProfile } = useContext(store);

  useEffect(() => {
    console.log('PHARMA PROFILE:  ---', profile);

    
    (async() => {
      getCurrentProfile();
    })()
    console.log('PHARMA Loader:  ---', loading);

    console.log('Rendered!');
  }, []);

  return loading && profile === null ? (
    <Loader />
  ) : (
    <Fragment>
      {profile !== null ? (
        <Fragment>
          <h3>{profile.handle}</h3>
          <Experience experience={profile.experience} />
          <br/>
          <br/>
          <Education education={profile.education} />
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create/user/profile" className="cta-btn dark">
            Create profile
          </Link>
        </Fragment>
      )}
      <Log value={profile} />
    </Fragment>
  );
};

export default withRouter(CurrentUserProfile);
