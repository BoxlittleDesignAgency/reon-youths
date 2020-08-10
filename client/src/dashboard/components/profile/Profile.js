import React, { Fragment, useEffect, useContext } from 'react';

import { Link, withRouter } from 'react-router-dom';
import { store } from '../../../dashboard/components/context/store';
import { isAuthenticated } from '../../../pages/components/auth/helpers';
import Loader from '../../../pages/shared/loading/Loader';
import Log from '../../../pages/shared/Log';

import ProfileTop from './ProfileTop';
import ProfileBottom from './ProfileBottom';


const Profile = ({ match }) => {
  const { profile, loading, getProfileById } = useContext(store);

  useEffect(() => {
    (() => getProfileById(match.params.id))();
  }, [match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="neu-card neu-card__simple controller">
            <div className="neu-card__cnt">
              <ProfileTop profile={profile} />
              <ProfileBottom profile={profile} />
              </div>
          </div>
        </Fragment>
      )}
      {/* <Log value={profile} /> */}
    </Fragment>
  );
};

export default withRouter(Profile);
