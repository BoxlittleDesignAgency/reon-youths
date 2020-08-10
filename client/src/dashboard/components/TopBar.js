import React, { Fragment, useEffect, useContext } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

import { isAuthenticated } from '../../pages/components/auth/helpers';

import { store } from '../../dashboard/components/context/store';

const TopBar = () => {
  const { profile } = useContext(store);
  const { name, email } = isAuthenticated();

  useEffect(() => {}, [profile])
  return (
    <Fragment>
      <div className="top-part">
        <div className="welcome-msg">
          Welcome{' '}
          <span
            className="light-bold"
            style={{ fontSize: '1.325rem', marginLeft: '2rem' }}
          >
            <button className="neu neu-button">{name},</button>
          </span>
        </div>
        <div className="dropdown_profile">
          <svg width="8" height="5" viewBox="0 0 8 5" data-reactid="35">
            <path
              d="M1.707.293c-.391-.391-1.024-.391-1.414 0-.391.391-.391 1.024 0 1.414l3 3c.391.391 1.024.391 1.414 0l3-3c.391-.391.391-1.024 0-1.414-.391-.391-1.024-.391-1.414 0l-2.293 2.293-2.293-2.293z"
              data-reactid="36"
            ></path>
          </svg>

          <div className="drop">
            <button className="icon__account">
              <ion-icon name="person"></ion-icon>
            </button>
            {/* <div class="triangle"></div> */}

            <ul>
              <li>
                <Link to="/profile/me">My Profile</Link>
              </li>
              <li><Link to="/user/dashboard/settings">Account Settings</Link></li>
              <li>Sign Out</li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TopBar;
