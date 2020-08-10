import React, { Fragment, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  withRouter
} from 'react-router-dom';

import { isAuthenticated } from '../../pages/components/auth/helpers';

import { store } from '../../dashboard/components/context/store';


import Loader from '../../pages/shared/loading/Loader';
import Log from '../../pages/shared/Log';


const TaskLanding = ({ history }) => {
  const { profile, loading, getCurrentProfile } = useContext(store);

  useEffect(() => {
    console.log('PHARMA PROFILE:  ---', profile);

    (async () => {
      getCurrentProfile();
    })();

    console.log('TASKlANDING Rendered!');
  }, []);

  return loading && profile === null ? (
    <Loader />
  ) : (
    <Fragment>
      <h2>Will decide what to put here</h2>
      <Log value={profile} />
    </Fragment>
  );
};

export default withRouter(TaskLanding);
