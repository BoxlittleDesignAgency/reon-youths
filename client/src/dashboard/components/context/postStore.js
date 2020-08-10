import React, { createContext, useReducer, useMemo } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../actions/types';

import postReducer from '../reducers/post';
import {
  getCookie,
  removeLocalStorage,
  removeCookie
} from '../../../pages/components/auth/helpers';

import { getPosts, addLikes, removeLikes } from '../actions/post';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

const postStore = createContext(initialState);

const { Provider } = postStore;

const PostStateProvider = ({ children }) => {
  const token = getCookie('token');
  const [state, dispatch] = useReducer(postReducer, initialState);

  const addPost = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/post/new', formData, config);

      dispatch({
        type: ADD_POST,
        payload: res.data
      });
    } catch (err) {
      console.log('ERROR CREATING A POST:   ', err.response);
      dispatch({
        type: POST_ERROR,
        payload: err.response
      });
    }
  };

  const getPost = async (id) => {
    try {
      const res = await axios.get(`/api/post/${id}`);

      dispatch({
        type: GET_POST,
        payload: res.data
      });
    } catch (err) {
      console.log('ERROR GETTING POSTS: ', err);
      dispatch({
        type: POST_ERROR,
        payload: {
          error: err.response
        }
      });
    }
  };

  const getPosts = async () => {
    try {
      const res = await axios.get('/api/posts');

      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    } catch (err) {
      console.log('ERROR GETTING POSTS: ', err);
      dispatch({
        type: POST_ERROR,
        payload: {
          error: err.response
        }
      });
    }
  };

  const deletePost = async (id) => {
    try {
      const res = await axios.delete(`/api/post/${id}`);
      console.log('DELETED SUCCESSFULLY');
      dispatch({
        type: DELETE_POST,
        payload: id
      });
    } catch (err) {
      console.log('ERROR DELETING POST:  ', err);
      dispatch({
        type: POST_ERROR,
        payload: { error: err.response }
      });
    }
  };

  const addLikes = async (id) => {
    try {
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      const res = await axios.put(`/api/posts/like/${id}`, config);
      console.log('ADD LIKES ====== ');
      console.log('MY PAYLOAD FROM LIKE', res.data);
      dispatch({
        type: UPDATE_LIKES,
        payload: {
          id,
          likes: res.data
        }
      });
    } catch (err) {
      console.log('ERROR FROM ADDLIKE   ');
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  const removeLikes = async (id) => {
    try {
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      const res = await axios.put(`/api/posts/unlike/${id}`, config);
      console.log('MY PAYOAD FROM UNLIKE', res.data);
      dispatch({
        type: UPDATE_LIKES,
        payload: {
          id,
          likes: res.data
        }
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR
        // payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  //Add comment
  const addComment = async (postId, formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(
        `/api/posts/comment/${postId}`,
        formData,
        config
      );

      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      });
    } catch (err) {
      console.log('ADD COMMENT TO POST:   ', err.response);
      dispatch({
        type: POST_ERROR,
        payload: err.response
      });
    }
  };

  //Delete comment
  const deleteComment = async (postId, commentId) => {
    try {
      const res = await axios.delete(
        `/api/posts/comment/${postId}/${commentId}`
      );

      dispatch({
        type: REMOVE_COMMENT,
        payload: commentId
      });
    } catch (err) {
      console.log('ERROR DELETING COMMENT FROM POST:   ', err.response);
      dispatch({
        type: POST_ERROR,
        payload: err.response
      });
    }
  };

  // const providerValue = useMemo(
  //   () => ({
  //     posts: state.posts,
  //     post: state.post,
  //     loading: state.loading,
  //     error: state.error,
  //     dispatch,
  //     getPosts,
  //     addLikes,
  //     removeLikes,
  //     deletePost
  //   }),
  //   [state, dispatch]
  // );

  return (
    <Provider
      value={{
        posts: state.posts,
        post: state.post,
        loading: state.loading,
        error: state.error,
        dispatch,
        getPosts,
        getPost,
        addLikes,
        removeLikes,
        deletePost,
        addPost,
        addComment,
        deleteComment
      }}
    >
      {children}
    </Provider>
  );
};

export { postStore, PostStateProvider };
