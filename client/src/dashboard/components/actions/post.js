import axios from 'axios';

import { getCookie } from '../../../pages/components/auth/helpers';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from './types';

const token = getCookie('token');
//Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR
      // payload: {msg: err.response.statusText,
      // status: err.response.status}
    });
  }
};

//Add likes
export const addLikes = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
    const res = await axios.put(`/api/posts/like/${id}`, config);
    console.log('ADD LIKES ====== ');
    // dispatch({
    //   type: UPDATE_LIKES,
    //   payload: {
    //     id,
    //     likes: res.data
    //   }
    // });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      // payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Remove likes
export const removeLikes = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
    const res = await axios.put(`/api/posts/unlike/${id}`, config);

    dispatch({
      type: UPDATE_LIKES,
      payload: {
        id,
        likes: res.data
      }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      // payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
