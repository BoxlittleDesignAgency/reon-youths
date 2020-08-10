import React, { Fragment, useState, useEffect, useContext } from 'react';

import { Link, withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { store } from '../context/store';

import Log from '../../../pages/shared/Log';

import { isAuthenticated } from '../../../pages/components/auth/helpers';

import './Forms.css';

const initialState = {
  handle: '',
  status: '',
  skills: '',
  city: '',
  country: '',
  bio: '',
  location: '',
  dob: '',
  youtube: '',
  linkedin: '',
  facebook: '',
  kingschat: '',
  buttonText: 'Update Profile'
};

const EditProfileForm = ({ history }) => {
  const { profile, loading, getCurrentProfile, createProfile } = useContext(
    store
  );

  const [error, setError] = useState('');

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const [formData, setFormData] = useState(initialState);


  const { role } = isAuthenticated();
  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.user) {
        if (key in profileData) profileData[key] = profile.user[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');

      setFormData(profileData);
    }
    // setFormData({
    //   ...formData,
    //   status: loading || !profile.status ? '': profile.status,
    //   handle: loading || !profile.handle ? '': profile.handle,
    //   dob: loading || !profile.dob ? '': profile.dob,
    //   city: loading || !profile.city ? '': profile.city,
    //   country: loading || !profile.country ? '': profile.country,
    //   location: loading || !profile.location ? '': profile.location,
    //   skills: loading || !profile.skills ? '': profile.skills.join(','),
    //   bio: loading || !profile.bio ? '' : profile.bio,
    //   facebook: loading || !profile.social ? '' : profile.social.facebook,
    //   linkedin: loading || !profile.social ? '' : profile.social.linkedin,
    //   youtube: loading || !profile.social ? '' : profile.social.youtube,
    //   kingschat: loading || !profile.social ? '' : profile.social.kingschat,
    //   // buttonText:"Profile Updated"
    // })
  }, [loading, profile, getCurrentProfile]);

  const {
    handle,
    status,
    skills,
    city,
    country,
    bio,
    location,
    dob,
    youtube,
    linkedin,
    facebook,
    kingschat,
    buttonText
  } = formData;

  const handleChange = (name) => (event) => {
    event.preventDefault();
    setFormData({
      ...formData,
      [name]: event.target.value,
      buttonText: 'Update Profile'
    });
  };

  const clickFormSubmit = async (event) => {
    console.log('FORM SUBMITTED!!!');
    try {
      // setFormData({ ...formData, buttonText: 'Profile Updated' });
      createProfile(formData, history, profile ? true : false);
      toast.success('Profile Updated');
    } catch (error) {
      setError(error.response.data.error);
      console.log('PROFILE UPDATE ERROR');
      toast.error(error.response.data.error);
    }
  };

  const editProfileForm = () => (
    <form id="create-form" className="form">
      <div className="form-enclosure">
        <div className="form-case">
          <div className="form-group">
            <select
              name="status"
              className="form__input"
              value={status}
              onChange={handleChange('status')}
            >
              <option value="0">Select Professional Status</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <input
              value={handle}
              type="text"
              className="form__input"
              name="handle"
              placeholder="handle"
              autoComplete="off"
              onChange={handleChange('handle')}
            />
            <small className="form-text">Please choose a unique handle</small>
          </div>
          <div className="form-group">
            <input
              defaultValue={dob}
              type="text"
              className="form__input"
              name="dob"
              placeholder="dd/mm/yyyy"
              autoComplete="off"
              disabled
              // onChange={handleChange('dob')}
            />
            <small className="form-text">Please enter your dob</small>
          </div>

          <div className="form-group">
            <input
              value={skills}
              type="text"
              className="form__input"
              name="skills"
              placeholder="Skills"
              autoComplete="off"
              onChange={handleChange('skills')}
            />
            <small className="form-text">
              Please use comma separated values (e.g HTML,CSS)
            </small>
          </div>
          <div className="form-group">
            <textarea
              value={bio}
              className=""
              placeholder="A short B
        bio of yourself"
              name="bio"
              autoComplete="off"
              onChange={handleChange('bio')}
            />

            <small className="form-text">Tell us a little about yourself</small>
          </div>
          <div className="form-group">
            <input
              value={city}
              type="text"
              className="form__input"
              name="city"
              placeholder="city"
              autoComplete="off"
              onChange={handleChange('city')}
            />
            <small className="form-text">
              Please enter the city you reside in.
            </small>
          </div>
          <div className="form-group">
            <input
              value={country}
              type="text"
              className="form__input"
              name="country"
              placeholder="country"
              autoComplete="off"
              onChange={handleChange('country')}
            />
            <small className="form-text">
              Please enter your country of residence
            </small>
          </div>
        </div>
        <div className="form-case">
          <div className="form-group">
            <input
              value={location}
              type="text"
              className="form__input"
              name="location"
              placeholder="location"
              autoComplete="off"
              onChange={handleChange('location')}
            />
            <small className="form-text">Please enter your location</small>
          </div>
          {/* <div className="form-group">
            <input
              value={status}
              type="text"
              className="form__input"
              name="status"
              placeholder="status"
              autoComplete="off"
              onChange={handleChange('status')}
            />
            <small className="form-text">Please enter your status</small>
          </div> */}

          <div className="sharpe">
            <div
              className="dash-btn dash-btn__secondary"
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
            >
              <p>Add Social Links</p>
            </div>
            <span>Optional</span>
          </div>

          {displaySocialInputs && (
            <Fragment>
              <div className="form-group">
                {/* <ion-icon name="logo-youtube"></ion-icon> */}
                <input
                  value={youtube}
                  type="text"
                  className="form__input"
                  placeholder="youtube URL"
                  name="youtube"
                  onChange={handleChange('youtube')}
                />
              </div>

              <div className="form-group">
                {/* <ion-icon name="logo-linkedin"></ion-icon> */}
                <input
                  value={linkedin}
                  type="text"
                  className="form__input"
                  placeholder="linkedin url"
                  name="linkedin"
                  onChange={handleChange('linkedin')}
                />
              </div>

              <div className="form-group">
                <input
                  value={facebook}
                  type="text"
                  className="form__input"
                  placeholder="facebook URL"
                  name="facebook"
                  onChange={handleChange('facebook')}
                />
              </div>

              <div className="form-group">
                <input
                  value={kingschat}
                  type="text"
                  className="form__input"
                  placeholder="kingschat URL"
                  name="kingschat"
                  onChange={handleChange('kingschat')}
                />
              </div>
            </Fragment>
          )}
        </div>
      </div>

      <div className="btn-section">
        <div className="dash-btn dash-btn__primary" onClick={clickFormSubmit}>
          <p>{buttonText}</p>
        </div>
        <Link to={role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}>
          <div className="dash-btn dash-btn__secondary">
            <p>Go Back</p>
          </div>
        </Link>
      </div>
    </form>
  );

  return (
    <Fragment>
      <h2 className="dashit-h2">Update Your Profile</h2>
      <h3 className="dashit-h3">Keep your information up to date.</h3>

      <ToastContainer />
      {editProfileForm()}
      {error}
      {/* <Log value={formData} /> */}
    </Fragment>
  );
};

export default withRouter(EditProfileForm);
