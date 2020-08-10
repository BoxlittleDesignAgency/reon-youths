import React, {
  Fragment,
  useState,
  useEffect,
  useReducer,
  useContext
} from 'react';

import { Link, withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { store } from '../context/store';

import { isAuthenticated } from '../../../pages/components/auth/helpers';

import { getCookie } from '../../../pages/components/auth/helpers';

import './Forms.css';
import Log from '../../../pages/shared/Log';
import axios from 'axios';

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
  buttonText: 'Create Profile'
}

const { role } = isAuthenticated();

const CreateProfileForm = ({ history }) => {
  const { profile, loading, getCurrentProfile } = useContext(store);

  const [error, setError] = useState('');

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const [formData, setFormData] = useState(initialState);

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

  const token = getCookie('token');

  useEffect(() => {
    console.log('Create Profile Loaded');

    (async() => {
      if(!profile) getCurrentProfile();
    })();

    // console.log('I GOT THE COOKIE BACK', token);
  }, []);

  const handleChange = (name) => (event) => {
    event.preventDefault();
    setFormData({ ...formData, [name]: event.target.value });
  };

  const clickFormSubmit = async (event) => {
    console.log('FORM SUBMITTED!!!');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
    try {
      const res = await axios.post('/api/user/profile/add', formData, config);

      setError('');
      setFormData({...formData, buttonText: "Profile Created"})
      toast.success(res.data.msg);
      history.push('/admin/dashboard');
    } catch (err) {
      setError(err.response.data.error);
      setFormData({...formData, buttonText: "Profile not created"})
      toast.error(err.response.data.error);
    }
  };

  const createProfileForm = () => (
    <form id="create-form" className="form">
      <div className="form-enclosure">
        <div className="form-case">
          {/* <div className="form-group">
            <input
              defaultValue={email}
              type="text"
              className="form__input"
              name="email"
              placeholder="email"
              autoComplete="off"
              disabled
            />
          </div> */}
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
              value={dob}
              type="text"
              className="form__input"
              name="dob"
              placeholder="dob"
              autoComplete="off"
              onChange={handleChange('dob')}
            />
            <small className="form-text">Please entera unique dob</small>
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
              placeholder="City"
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
              placeholder="Country"
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
              placeholder="Location"
              autoComplete="off"
              onChange={handleChange('location')}
            />
            <small className="form-text">Please enter your location</small>
          </div>
          <div className="form-group">
            <input
              value={status}
              type="text"
              className="form__input"
              name="status"
              placeholder="Status"
              autoComplete="off"
              onChange={handleChange('status')}
            />
            <small className="form-text">Please enter your status</small>
          </div>

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
                  placeholder="Youtube URL"
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
                  placeholder="LinkedIn URL"
                  name="linkedin"
                  onChange={handleChange('linkedin')}
                />
              </div>

              <div className="form-group">
                <input
                  value={facebook}
                  type="text"
                  className="form__input"
                  placeholder="Facebook URL"
                  name="facebook"
                  onChange={handleChange('facebook')}
                />
              </div>

              <div className="form-group">
                <input
                  value={kingschat}
                  type="text"
                  className="form__input"
                  placeholder="Kingschat URL"
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
        <Link
          to={role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}
        >
          <div className="dash-btn dash-btn__secondary">
            <p>Go Back</p>
          </div>
        </Link>
      </div>
    </form>
  );

  return (
    <Fragment>
      <h2 className="dashit-h2">Create Your Profile</h2>
      <h3 className="dashit-h3">
        Lets get some information to make your profile stand out
      </h3>

      <ToastContainer />
      {createProfileForm()}
      {profile ? "Profile Created!!" : ""}
      {error}
      <Log value={formData} />
    </Fragment>
  );
};

export default withRouter(CreateProfileForm);
