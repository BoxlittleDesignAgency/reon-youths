import React, { createContext, useReducer, useMemo } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import {
  GET_PROFILE,
  GET_PROFILES,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  PROFILE_ERROR,
  SENDING_REQUEST,
  REQUEST_FINISHED,
  ACCOUNT_DELETED
} from '../actions/types';

import profileReducer from '../reducers/profile';
import {
  getCookie,
  removeLocalStorage,
  removeCookie
} from '../../../pages/components/auth/helpers';

// import { createProfile } from '../actions/profile';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {}
};

const store = createContext(initialState);

const { Provider } = store;

const StateProvider = ({ children }) => {
  const token = getCookie('token');
  const [state, dispatch] = useReducer(profileReducer, initialState);

  //Get current users profile
  const getCurrentProfile = async () => {
    try {
      dispatch({ type: SENDING_REQUEST });
      const res = await axios.get('/api/user/profile/me');

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });

      dispatch({ type: REQUEST_FINISHED });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: err.response
      });
      dispatch({ type: REQUEST_FINISHED });
    }
  };

  //Get all profiles
  const getProfiles = async () => {
    dispatch({ type: CLEAR_PROFILE });

    try {
      const res = await axios.get('/api/profile/all');

      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
      dispatch({ type: REQUEST_FINISHED });
    } catch (err) {
      console.log(err);
      dispatch({
        type: PROFILE_ERROR
      });
      dispatch({ type: REQUEST_FINISHED });
    }
  };

  //Get all users
  const getUsers = async () => {
    dispatch({ type: CLEAR_PROFILE });

    try {
      const res = await axios.get('/api/users');
      console.log("It fired the users")
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
      dispatch({ type: REQUEST_FINISHED });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status
        }
      });
    }
  };

  //Get all profile by ID
  const getProfileByHandle = async (handle) => {
    try {
      const res = await axios.get(`/profile/user/${handle}`);

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      dispatch({ type: REQUEST_FINISHED });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status
        }
      });
    }
  };
  //Get all profile by ID
  const getProfileById = async (userId) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/profile/user/${userId}`
      );

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      dispatch({ type: REQUEST_FINISHED });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status
        }
      });
    }
  };

  //Create and Update Profile
  const createProfile = async (formData, history, edit = false) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      dispatch({ type: SENDING_REQUEST });
      const res = await axios.post('/api/user/profile/add', formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });

      console.log('Updated Successfully');

      if (!edit) {
        history.push('/admin/dashboard');
      }
    } catch (err) {
      const errors = err.response.data.errors;
      // if (errors) {
      //   errors.forEach((error) => dispatch(setError(error)));
      // }
      console.log('CREATE PROFILE ERROR:  ====', errors);

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status
        }
      });
      dispatch({ type: REQUEST_FINISHED });
    }
  };

  //Add Experience
  const addExperience = async (formData, history) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      dispatch({ type: SENDING_REQUEST });
      const res = await axios.post(
        '/api/profile/add/experience',
        formData,
        config
      );

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      console.log('Experience Added Successfully');

      history.push('/admin/dashboard');
      dispatch({ type: REQUEST_FINISHED });
    } catch (err) {
      const errors = err;
      // if (errors) {
      //   errors.forEach((error) => dispatch(setError(error)));
      // }
      console.log('ADDING EXPERIENCE ERROR:  ====', errors);

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status
        }
      });
      dispatch({ type: REQUEST_FINISHED });
    }
  };

  //Add Education
  const addEducation = async (formData, history) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      dispatch({ type: SENDING_REQUEST });
      const res = await axios.post(
        '/api/profile/add/education',
        formData,
        config
      );

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      console.log('Education Added Successfully');
      toast.success('Education added.');

      history.push('/admin/dashboard');
      dispatch({ type: REQUEST_FINISHED });
    } catch (err) {
      const errors = err.response.data.error;
      // if (errors) {
      //   errors.forEach((error) => dispatch(setError(error)));
      // }
      console.log('ADDING EXPERIENCE ERROR:  ====', errors);
      toast.error(errors);
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status
        }
      });
      dispatch({ type: REQUEST_FINISHED });
    }
  };

  //Delete Education
  const deleteEducation = async (id, history) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      dispatch({ type: SENDING_REQUEST });
      const res = await axios.delete(
        `/api/profile/delete/education/${id}`,
        config
      );
      history.push('/admin/dashboard');
      dispatch({ type: REQUEST_FINISHED });
    } catch (err) {
      const errors = err.response;
      console.log('ADDING EDUCATION ERROR:  ====', errors);

      // dispatch({
      //   type: PROFILE_ERROR,
      //   payload: {
      //     msg: err.response.statusText,
      //     status: err.response.status
      //   }
      // });

      dispatch({ type: REQUEST_FINISHED });
    }
  };

  //Delete Experience
  const deleteExperience = async (id, history) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      dispatch({ type: SENDING_REQUEST });
      const res = await axios.delete(
        `/api/profile/delete/experience/${id}`,
        config
      );
      history.push('/admin/dashboard');
      dispatch({ type: REQUEST_FINISHED });
    } catch (err) {
      const errors = err.response;
      console.log('ADDING EXPERIENCE ERROR:  ====', errors);

      // dispatch({
      //   type: PROFILE_ERROR,
      //   payload: {
      //     msg: err.response.statusText,
      //     status: err.response.status
      //   }
      // });
      dispatch({ type: REQUEST_FINISHED });
    }
  };

  //Delete account & profile
  const deleteAccount = async (id, history) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };

        dispatch({ type: SENDING_REQUEST });
        const res = await axios.delete(`/api/profile/delete`, config);

        removeCookie('token');
        removeLocalStorage('user');
        history.push('/');
        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: ACCOUNT_DELETED });
      } catch (err) {
        // const errors = err.response.data.errors;
        // console.log('ADDING EXPERIENCE ERROR:  ====', errors);

        // dispatch({
        //   type: PROFILE_ERROR,
        //   payload: {
        //     msg: err.response.statusText,
        //     status: err.response.status
        //   }
        // });
        dispatch({ type: REQUEST_FINISHED });
      }
    }
  };

  return (
    <Provider
      value={{
        profile: state.profile,
        profiles: state.profiles,
        loading: state.loading,
        error: state.error,
        getCurrentProfile,
        createProfile,
        addEducation,
        addExperience,
        deleteExperience,
        deleteEducation,
        deleteAccount,
        getProfiles,
        getProfileById,
        getProfileByHandle,
        getUsers
      }}
    >
      {children}
    </Provider>
  );
};

export { store, StateProvider };
