import React, { Fragment, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { store } from '../../dashboard/components/context/store';

const Settings = () => {
  const { deleteAccount } = useContext(store);

  useEffect(() => {
    console.dir('it got here');
  }, []);
  return (
    <Fragment>
      <div className="profile-header">
        <h3 className="profile-name">Settings</h3>
        <p>Update your profile password and settings </p>
      </div>
      <div className="profile-body">
        <button
          className="cta-btn dark"
          onClick={() => {
            deleteAccount();
          }}
        >
          Delete My Account
        </button>
      </div>
    </Fragment>
  );
};

export default withRouter(Settings);
