import React, { Fragment, useState, useEffect } from 'react';

import { Link, withRouter } from 'react-router-dom';

import Log from '../../../pages/shared/Log';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { isAuthenticated } from '../../../pages/components/auth/helpers';

//import mangageStore hook here
import {
  useManageSite,
  useManageSiteUpdate
} from '../../../globalcontext/manageSite';

const initialState = {
  aboutTitle: '',
  livestreamLink: '',
  aboutReonLink: '',
  usefulLinkTitle: '',
  rhapsodyLink: '',
  prayerNetworkLink: '',
  ambassadorNetworkLink: '',
  aboutTheAuthorLink: '',
  contactUsTitle: '',
  unitedStateLink: '',
  unitedKingdomLink: '',
  nigeriaLink: '',
  supportLink: '',
  followUsTitle: '',
  kingschatLink: '',
  facebookLink: '',
  instagramLink: '',
  youtubeLink: ''
};

const UpdateFooterNfo = ({ history }) => {
  //use context hook here
  const { siteFooterInfo, loading } = useManageSite();
  const { getSiteFooterData, updateSiteData } = useManageSiteUpdate();

  const [error, setError] = useState('');
  const [formData, setFormData] = useState(initialState);

  const { role } = isAuthenticated();

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      await getSiteFooterData();
    };

    if (mounted) {
      loadData();
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!loading && siteFooterInfo) {
      const {
        aboutTitle,
        livestreamLink,
        aboutReonLink,
        usefulLinkTitle,
        rhapsodyLink,
        prayerNetworkLink,
        ambassadorNetworkLink,
        aboutTheAuthorLink,
        contactUsTitle,
        unitedStateLink,
        unitedKingdomLink,
        nigeriaLink,
        supportLink,
        followUsTitle,
        kingschatLink,
        facebookLink,
        instagramLink,
        youtubeLink
      } = siteFooterInfo;
      setFormData({
        ...formData,
        aboutTitle,
        livestreamLink,
        aboutReonLink,
        usefulLinkTitle,
        rhapsodyLink,
        prayerNetworkLink,
        ambassadorNetworkLink,
        aboutTheAuthorLink,
        contactUsTitle,
        unitedStateLink,
        unitedKingdomLink,
        nigeriaLink,
        supportLink,
        followUsTitle,
        kingschatLink,
        facebookLink,
        instagramLink,
        youtubeLink
      });
    }
  }, [siteFooterInfo]);

  const {
    aboutTitle,
    livestreamLink,
    aboutReonLink,
    usefulLinkTitle,
    rhapsodyLink,
    prayerNetworkLink,
    ambassadorNetworkLink,
    aboutTheAuthorLink,
    contactUsTitle,
    unitedStateLink,
    unitedKingdomLink,
    nigeriaLink,
    supportLink,
    followUsTitle,
    kingschatLink,
    facebookLink,
    instagramLink,
    youtubeLink
  } = formData;

  const handleChange = (name) => (event) => {
    event.preventDefault();
    setFormData({
      ...formData,
      [name]: event.target.value
    });
  };

  const clickFormSubmit = async (event) => {
    console.log('UPDATE FOOTER FORM SUBMITTED!!!');
    try {
      //imported action from context
      await updateSiteData(formData, history, siteFooterInfo ? true : false);
      toast.success('Site Footer Updated');
    } catch (error) {
      setError(error.response.data.error);
      console.log('UPDATE FOOTER ERROR');
      toast.error(error.response.data.error);
    }
  };

  const updateFooterForm = () => (
    <form id="update-footer" className="form">
      <div className="footer-row">
        <div className="footer-column">
          <h4>
            <input
              value={aboutTitle}
              type="text"
              className="form__input"
              name="aboutTitle"
              placeholder="aboutTitle"
              autoComplete="off"
              onChange={handleChange('aboutTitle')}
            />
          </h4>
          <p>
            <input
              value={livestreamLink}
              type="text"
              className="form__input"
              name="livestreamLink"
              placeholder="Livestream"
              autoComplete="off"
              onChange={handleChange('livestreamLink')}
            />
          </p>
          <p>
            <input
              value={aboutReonLink}
              type="text"
              className="form__input"
              name="aboutReonLink"
              placeholder="About REON"
              autoComplete="off"
              onChange={handleChange('aboutReonLink')}
            />
          </p>
        </div>
        <div className="footer-column">
          <h4>
            <input
              value={usefulLinkTitle}
              type="text"
              className="form__input"
              name="usefulLinkTitle"
              placeholder="Useful Links"
              autoComplete="off"
              onChange={handleChange('usefulLinkTitle')}
            />
          </h4>
          <p>
            <input
              value={rhapsodyLink}
              type="text"
              className="form__input"
              name="rhapsodyLink"
              placeholder="Rhapsody of Realities"
              autoComplete="off"
              onChange={handleChange('rhapsodyLink')}
            />
          </p>
          <p>
            <input
              value={prayerNetworkLink}
              type="text"
              className="form__input"
              name="prayerNetworkLink"
              placeholder="Prayer Network"
              autoComplete="off"
              onChange={handleChange('prayerNetworkLink')}
            />
          </p>

          <p>
            <input
              value={ambassadorNetworkLink}
              type="text"
              className="form__input"
              name="ambassadorNetworkLink"
              placeholder="Ambassador Network"
              autoComplete="off"
              onChange={handleChange('ambassadorNetworkLink')}
            />
          </p>

          <p>
            <input
              value={aboutTheAuthorLink}
              type="text"
              className="form__input"
              name="aboutTheAuthorLink"
              placeholder="About the Author"
              autoComplete="off"
              onChange={handleChange('aboutTheAuthorLink')}
            />
          </p>
        </div>
        <div className="footer-column">
          <h4>
            <input
              value={contactUsTitle}
              type="text"
              className="form__input"
              name="contactUsTitle"
              placeholder="Contact Us"
              autoComplete="off"
              onChange={handleChange('contactUsTitle')}
            />
          </h4>
          <p>
            <input
              value={unitedStateLink}
              type="text"
              className="form__input"
              name="unitedStateLink"
              placeholder="United State"
              autoComplete="off"
              onChange={handleChange('unitedStateLink')}
            />
          </p>
          <p>
            <input
              value={unitedKingdomLink}
              type="text"
              className="form__input"
              name="unitedKingdomLink"
              placeholder="United Kingdom"
              autoComplete="off"
              onChange={handleChange('unitedKingdomLink')}
            />
          </p>
          <p>
            <input
              value={nigeriaLink}
              type="text"
              className="form__input"
              name="nigeriaLink"
              placeholder="Nigeria"
              autoComplete="off"
              onChange={handleChange('nigeriaLink')}
            />
          </p>

          <p>
            <input
              value={supportLink}
              type="text"
              className="form__input"
              name="supportLink"
              placeholder="Support"
              autoComplete="off"
              onChange={handleChange('supportLink')}
            />
          </p>
        </div>
        <div className="footer-column">
          <h4>
            <input
              value={followUsTitle}
              type="text"
              className="form__input"
              name="followUsTitle"
              placeholder="Contact Us"
              autoComplete="off"
              onChange={handleChange('followUsTitle')}
            />
          </h4>
          <p>
            <input
              value={kingschatLink}
              type="text"
              className="form__input"
              name="kingschatLink"
              placeholder="KingsChat"
              autoComplete="off"
              onChange={handleChange('kingschatLink')}
            />
          </p>
          <p>
            <input
              value={facebookLink}
              type="text"
              className="form__input"
              name="facebookLink"
              placeholder="Facebook"
              autoComplete="off"
              onChange={handleChange('facebookLink')}
            />
          </p>
          <p>
            <input
              value={instagramLink}
              type="text"
              className="form__input"
              name="instagramLink"
              placeholder="Instagram"
              autoComplete="off"
              onChange={handleChange('instagramLink')}
            />
          </p>
          <p>
            <input
              value={youtubeLink}
              type="text"
              className="form__input"
              name="youtubeLink"
              placeholder="Youtube"
              autoComplete="off"
              onChange={handleChange('youtubeLink')}
            />
          </p>
        </div>
      </div>
      <div className="dash-btn dash-btn__primary" onClick={clickFormSubmit}>
        <p>Update Info</p>
      </div>
    </form>
  );

  return (
    <Fragment>
      <h3>Update Footer Info</h3>
      <ToastContainer />
      {updateFooterForm()}
      {error}
      {/* <Log value={formData} /> */}
    </Fragment>
  );
};

export default withRouter(UpdateFooterNfo);
