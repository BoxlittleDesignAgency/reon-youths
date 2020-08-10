import React, { Fragment, useState, useContext } from 'react';

import { Link, withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { store } from '../context/store';

import './Forms.css';
import Log from '../../../pages/shared/Log';

const AddEducationForm = ({ history }) => {
  const { profile, addEducation } = useContext(store);

  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    from: '',
    fieldofstudy: '',
    to: '',
    current: false,
    description: '',
    buttonText: 'Add Education'
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
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
    console.log('ADD EDUCATION FORM SUBMITTED!!!');
    
    addEducation(formData, history);
  };

  const addEduForm = () => (
    <form id="create-form" className="form">
      <div className="form-enclosure">
        <div className="form-case">
          <div className="form-group">
            <input
              value={school}
              type="text"
              className="form__input"
              name="school"
              placeholder="school or bootcamp"
              autoComplete="off"
              onChange={handleChange('school')}
            />
            <small className="form-text">Please add your title</small>
          </div>
          <div className="form-group">
            <input
              value={degree}
              type="text"
              className="form__input"
              name="degree"
              placeholder="degree or certificate"
              autoComplete="off"
              required
              onChange={handleChange('degree')}
            />
            <small className="form-text">Please enter the company</small>
          </div>
          <div className="form-group">
            <input
              value={fieldofstudy}
              type="text"
              className="form__input"
              name="fieldofstudy"
              placeholder="field of study"
              autoComplete="off"
              onChange={handleChange('fieldofstudy')}
            />
            <small className="form-text">Please add field of study</small>
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
                  placeholder="current Study"
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
              placeholder="Programme description"
              name="description"
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
      <h2 className="dashit-h2">Add Your Education</h2>
      <h3 className="dashit-h3">
        Add any school or bootcamp you have attended
      </h3>

      <ToastContainer />
      {addEduForm()}

      {error}
      <Log value={formData} />
    </Fragment>
  );
};

export default withRouter(AddEducationForm);
