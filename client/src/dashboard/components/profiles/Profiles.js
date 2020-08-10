import React, { Fragment, useEffect, useContext } from 'react';

import ProfileItem from './ProfileItem';
import { store } from '../context/store';
import Loader from '../../../pages/shared/loading/Loader';
import Log from '../../../pages/shared/Log.js';

const Profiles = () => {
  const { loading, getProfiles, profiles } = useContext(store);

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2>All Registered Profiles</h2>
          <p className="">Browse and connect with Users (Detailed view)</p>
          <div>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found</h4>
            )}
          </div>
        </Fragment>
      )}
      {/* <Log value={profiles} /> */}
    </Fragment>
  );
};

export default Profiles;
