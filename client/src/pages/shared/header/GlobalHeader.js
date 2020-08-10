import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

import {
  isAuthenticated,
  logout
} from '../../../pages/components/auth/helpers';

import Hamburger from './Hamburger';

import ReonLogo from '../../../assets/images/REON_YOUTHS_INTERNATIONAL_LOGO_WHITE_BG.svg';

import './GlobalHeader.scss';

const isActive = (history, path) => {
  if (history.location.pathname === path)
    return {
      color: `#f90`,
      fontWeight: `400`
    };
  else return { color: `#0f1d22` };
};

const GlobalHeaderContainer = ({ className, children }) => (
  <Fragment>
    <div className={className}>{children}</div>
  </Fragment>
);

const Flex = ({ className, children }) => (
  <Fragment>
    <div className={className}>{children}</div>
  </Fragment>
);

const GlobalHeader = ({ onCursor, history, match }) => {
  //state for menu button
  const [state, setState] = useState({
    initial: false,
    clicked: null,
    menuName: 'Menu'
  });

  //state for disabled button
  const [disabled, setDisabled] = useState(false);

  //useEffect for page changes
  useEffect(() => {
    //Listen for page changes (OPTIONAL)
    history.listen(() => {
      setState({ clicked: false, menuName: 'Menu' });
    });
  }, []);

  const handleMenu = () => {
    disableMenu();
    if (state.initial === false) {
      setState({
        initial: null,
        clicked: true,
        menuName: 'Close'
      });
      console.log(1);
    } else if (state.clicked === true) {
      setState({
        clicked: !state.clicked,
        menuName: 'Menu'
      });
      console.log(2);
    } else if (state.clicked === false) {
      setState({
        clicked: !state.clicked,
        menuName: 'Close'
      });
      console.log(3);
    }
  };

  //Determine if our menu button should be disabled
  const disableMenu = () => {
    setDisabled(!disabled);

    setTimeout(() => {
      setDisabled(false);
    }, 1200);
  };

  return (
    <Fragment>
      <header id="global-header" className="at-top">
        <GlobalHeaderContainer className="navbar_container">
          <nav id="primary-navigation">
            <div className="flex flex-spaced">
              <div className="col left-menu">
                <div className="logo">
                  <Link to="/" className="logo-link">
                    <div className="logo-link-img"></div>
                    <div className="logo-link-txt">
                      <h4 className="logo-headline">
                        Reon <span>youths</span>
                      </h4>
                      <span className="logo-tagline">international</span>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col middle-menu">
                <ul className="navigation-container">
                  <li>
                    <Link to="/" style={isActive(history, '/')}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" style={isActive(history, '/about')}>
                      About RoR
                    </Link>
                  </li>
                  <li>
                    <a href="https://1millionoutreaches.rhapsodyofrealities.org/online/online.php?id=reonyouths">
                      Be an Ambassador
                    </a>
                  </li>
                  <li>
                    <Link
                      to="/live-stream"
                      style={isActive(history, '/live-stream')}
                    >
                      Livestream
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" style={isActive(history, '/contact')}>
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col right-menu">
                <ul>
                  {!isAuthenticated() && (
                    <Fragment>
                      <li className="register">
                        <Link to="/register" title="Register">
                          Register
                        </Link>
                      </li>
                      <li className="login">
                        <Link to="/login" title="Login">
                          Login
                        </Link>
                      </li>
                    </Fragment>
                  )}
                  {isAuthenticated() &&
                    isAuthenticated().role === 'subscriber' && (
                      <li className="login">
                        <Link to="/user/dashboard" title="Dashboard">
                          Dashboard
                        </Link>
                      </li>
                    )}
                  {isAuthenticated() && isAuthenticated().role === 'admin' && (
                    <li className="login">
                      <Link to="/admin/dashboard" title="Dashboard">
                        Dashboard
                      </Link>
                    </li>
                  )}
                  {isAuthenticated() && (
                    <li className="login">
                      <span
                        style={{
                          cursor: 'pointer',
                          fontWeight: '700',
                          color: '#fff'
                        }}
                        onClick={() => {
                          logout(() => {
                            history.push('/');
                          });
                        }}
                      >
                        Logout
                      </span>
                    </li>
                  )}
                  <li>
                    <div
                      className="menu"
                      style={{
                        cursor: 'pointer',
                        fontWeight: '700',
                        color: '#fff'
                      }}
                    >
                      <button
                        aria-expanded={
                          state.clicked === true ? 'true' : 'false'
                        }
                        disabled={disabled}
                        onClick={handleMenu}
                      >
                        {state.menuName}
                      </button>

                      {/* <span className="burger">
                    <div className="line1"></div>
                    <div className="line2"></div>
                  </span> */}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="box"></div>
        </GlobalHeaderContainer>
        <Hamburger state={state} />
      </header>
    </Fragment>
  );
};

export default withRouter(GlobalHeader);
