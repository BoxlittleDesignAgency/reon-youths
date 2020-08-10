import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './DashboardActions.css';

const DashboardActions = () => {
  return (
    <Fragment>
      <div className="dash-buttons">
        <Link to="/user/profile/add" className="neo-btn">
          <i className="lni lni-highlight"></i> Edit Profile
        </Link>
        <Link to="/add/experience" className="neo-btn">
          <i className="lni lni-information"></i> Add Experience
        </Link>
        <Link to="/add/education" className="neo-btn">
          <i className="lni lni-graduation"></i> Add Education
        </Link>
        <Link to="/add-education" className="neo-btn">
          <i className="lni lni-graduation"></i> Get single Profile
        </Link>
        <Link to="/profile/all" className="neo-btn">
          <i className="lni lni-graduation"></i> Get all Profiles
        </Link>
        <Link to="/profile/delete" className="neo-btn">
          <i className="lni lni-trash"></i> Delete Profile
        </Link>
      </div>
    </Fragment>
  );
};

export default DashboardActions;
