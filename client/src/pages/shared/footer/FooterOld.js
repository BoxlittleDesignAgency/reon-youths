import React, { Fragment } from 'react';


import './Footer.scss';

const Footer = () => (
  <Fragment>
    <footer className="footer" style={{ background: '#092837' }}>
      <div
        className="footer-inner"
        style={{
          paddingTop: '80px',
          paddingBottom: '40px',
          marginRight: 'auto',
          marginLeft: 'auto'
        }}
      >
        <div className="container">
          <div className="flex flex-spaced" style={{ paddingBottom: '110px', textAlign: "center" }}>
            <div className="footer__col">
              <div className="footer__logo">
                {/* <h2 className="footer__title">Reon Youths International</h2> */}
                <div className="footer-logo"></div>
              </div>
            </div>
            <div className="footer__col footer__col--menu">
              <div className="footer__col-title">
                <h6>RoR</h6>
              </div>
            </div>
            <div className="footer__col footer__col--menu">
              <div className="footer__col-title">
                <h6>About</h6>
              </div>
            </div>
            <div className="footer__col footer__col--menu">
              <div className="footer__col-title">
                <h6>Get Social</h6>
              </div>

              <div className="footer__menu footer__menu--social">
                <div className="social social--txt">
                  <ul className="social__inner">
                    <li className="social__item social__item--instagram">
                      <a href="!#" target="_blank">
                        Instagram
                      </a>
                    </li>
                    <li className="social__item social__item--kingschat">
                      <a href="!#" target="_blank">
                        Kingschat
                      </a>
                    </li>
                    <li className="social__item social__item--kingschat">
                      <a href="https://www.facebook.com/reonyouth/" target="_blank">
                        Facebook
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            className="footer__lower"
            style={{ marginTop: '50px', display: 'flex', alignItems: 'center' }}
          >
            <div className="footer__copyright">
              <p>© Reon Youths. All Rights Reserved.</p>
            </div>
            <div className="footer__attr">
              <a
                href="https://www.boxlittle.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Crafted by Boxlittle
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </Fragment>
);

export default Footer;
