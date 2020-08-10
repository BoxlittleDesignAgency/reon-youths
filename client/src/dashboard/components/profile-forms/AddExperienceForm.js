import React, {
  Fragment,
  useState,
  useContext
} from 'react';

import { Link, withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { store } from '../context/store';


import './Forms.css';
import Log from '../../../pages/shared/Log';

const AddExperienceForm = ({ history }) => {
  const { profile, addExperience } = useContext(store);

  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
    buttonText: 'Add Experience'
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
    buttonText
  } = formData;

  const handleChange = (name) => (event) => {
    event.preventDefault();
    setFormData({ ...formData, [name]: event.target.value });
  };

  const clickFormSubmit = async (event) => {
    console.log('FORM SUBMITTED!!!');
    addExperience(formData, history);
    toast.success('Experience added')
  };

  const addExpForm = () => (
    <form id="add-exp-form" className="form">
      <div className="form-enclosure">
        <div className="form-case">
          <div className="form-group">
            <input
              value={title}
              type="text"
              className="form__input"
              name="title"
              placeholder="title"
              autoComplete="off"
              required
              onChange={handleChange('title')}
            />
            <small className="form-text">Please add your title</small>
          </div>
          <div className="form-group">
            <input
              value={company}
              type="text"
              className="form__input"
              name="company"
              placeholder="company"
              autoComplete="off"
              required
              onChange={handleChange('company')}
            />
            <small className="form-text">Please enter the company</small>
          </div>
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
            <small className="form-text">Please add start date</small>
          </div>
          <div className="form-group">
            <input
              value={from}
              type="date"
              className="form__input"
              name="from"
              placeholder="from date"
              autoComplete="off"
              onChange={handleChange('from')}
            />
            <small className="form-text">Please add start date</small>
          </div>
        </div>
        <div className="form-case">
          <div className="form-group">
            <div className="checkbox">
              <div className="checkbox__1">
                <input
                  id="checkbox-1"
                  value={current}
                  type="checkbox"
                  className="form__input"
                  name="current"
                  placeholder="current job"
                  autoComplete="off"
                  checked={current}
                  onChange={(e) => {
                    setFormData({ ...formData, current: !current });
                    toggleDisabled(!toDateDisabled);
                  }}
                />
                <label htmlFor="checkbox-1">
                  <i className="lni lni-checkmark"></i>
                </label>
              </div>
            </div>
            <small className="form-text">Please add current</small>
          </div>
          <div className="form-group">
            <input
              value={to}
              type="date"
              className="form__input"
              name="to"
              placeholder="to date"
              autoComplete="off"
              onChange={handleChange('to')}
              disabled={toDateDisabled ? 'disabled' : ''}
            />
            <small className="form-text">Please add end date</small>
          </div>

          <div className="form-group">
            <textarea
              value={description}
              className=""
              placeholder="Job description"
              name="description"
              cols="30"
              rows="5"
              autoComplete="off"
              onChange={handleChange('description')}
            />

            <small className="form-text">Please tell us more</small>
          </div>
        </div>
      </div>

      <div className="btn-section">
        <div className="dash-btn dash-btn__primary" onClick={clickFormSubmit}>
          <p>{buttonText}</p>
        </div>
        <Link
          to='/admin/dashboard'>
          <div className="dash-btn dash-btn__secondary">
            <p>Go Back</p>
          </div>
        </Link>
      </div>
    </form>
  );

  return (
    <Fragment>
      <h2 className="dashit-h2">Add an Experience</h2>
      <h3 className="dashit-h3">
        Lets get some information about your experience
      </h3>

      <ToastContainer />
      {addExpForm()}

      {error}
      <Log value={formData} />
    </Fragment>
  );
};

export default withRouter(AddExperienceForm);
