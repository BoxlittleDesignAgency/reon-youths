import axios from 'axios';

import { getCookie } from '../../../pages/components/auth/helpers';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  SENDING_REQUEST,
  REQUEST_FINISHED
} from './types';

const token = getCookie('token');



export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    console.log('Action Creators Activated');
    const res = await axios.post('/api/user/profile/add', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

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
  }
};
