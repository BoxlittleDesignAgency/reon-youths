import React, { Fragment, useContext, useReducer, useMemo } from 'react';
import axios from 'axios';

import {
  getCookie,
  removeLocalStorage,
  removeCookie
} from '../pages/components/auth/helpers';

import {
  GET_SITE_FOOTER_DATA,
  UPDATE_SITE_FOOTER_DATA,
  SITE_FOOTER_DATA_ERROR,
  FETCHING_SITE_DATA,
  FETCHED_SITE_DATA
} from '../dashboard/components/actions/types';

export const ManageSiteProvider = React.createContext();
export const ManageSiteUpdateProvider = React.createContext({});

export const useManageSite = () => {
  const context = useContext(ManageSiteProvider);
  if (!context) {
    throw new Error('useManageSite must be used inside ManageSite');
  }

  console.log('CONTEXT STATE || =>', context);
  const { siteFooterInfo, loading } = context;
  console.log('CONTEXT STATE DESTRUCTURED || =>', siteFooterInfo);
  return {
    siteFooterInfo,
    loading
  };
};

export const useManageSiteUpdate = () => {
  const { setStateDispatch, getSiteFooterData, updateSiteData } = useContext(
    ManageSiteUpdateProvider
  );

  if (!setStateDispatch) {
    throw new Error('setStateDispatch =>  not supplied');
  } else if (!getSiteFooterData) {
    throw new Error('getSiteFooter => not supplied');
  } else if (!updateSiteData) {
    throw new Error('updateSiteFooter => not supplied');
  }

  return {
    setStateDispatch,
    getSiteFooterData,
    updateSiteData
  };
};

const SITE_SERVER = '/api/site';
const initialState = {
  siteFooterInfo: [],
  loading: true
};

//Reducer
const manageSiteReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SITE_FOOTER_DATA:
      return {
        ...state,
        siteFooterInfo: payload,
        loading: false
      };
    case UPDATE_SITE_FOOTER_DATA:
      return {
        ...state,
        siteFooterInfo: payload.siteFooterInfo,
        loading: false
      };
    case FETCHING_SITE_DATA:
      return 'FETCHING_SITE_DATA';
    case FETCHED_SITE_DATA:
      return 'FETCHED_SITE_DATA';
    default:
      return state;
  }
};

const ManageSite = ({ children }) => {
  const token = getCookie('token');
  const [state, setStateDispatch] = useReducer(manageSiteReducer, initialState);

  //Actions
  const getSiteFooterData = async () => {
    try {
      const res = await axios.get(`${SITE_SERVER}/site_data`);

      setStateDispatch({
        type: GET_SITE_FOOTER_DATA,
        payload: res.data[0]
      });
    } catch (err) {
      console.log('ERROR GETTING SITE DATA: ', err);
      setStateDispatch({
        type: SITE_FOOTER_DATA_ERROR,
        payload: {
          error: err.response
        }
      });
    }
  };

  // const getSiteData = () => {
  //   return getSiteDataAsync()
  //     .then((response) => {
  //       console.log('Recieved data from SERVER API.......Yay!!!!!!!');
  //       console.log('RESPONSE: ->', response);
  //       setStateDispatch({ type: FETCHING_SITE_DATA });
  //       setStateDispatch({
  //         type: GET_SITE_FOOTER_DATA,
  //         payload: response.data
  //       });
  //     })
  //     .catch((error) => {
  //       console.log('Error from below ->', error);
  //     });
  // };

  async function getSiteDataAsync() {
    try {
      const request = await axios.get(`${SITE_SERVER}/site_data`);
      const body = await request;
      return body;
    } catch (error) {
      console.log('ERROR GETTING SITE DATA: ', error);
      return error;
    }
  }
  // const getSiteData = async () => {
  //   try {
  //     const request = await axios.get(`${SITE_SERVER}/site_data`);
  //     console.log('It fired the pashan pashan');
  //     setStateDispatch({
  //       type: GET_SITE_FOOTER_DATA,
  //       payload: request.data
  //     });
  //   } catch (err) {
  //     console.log('ERROR GETTING POSTS: ', err);
  //     setStateDispatch({
  //       type: GET_SITE_FOOTER_DATA_ERROR,
  //       payload: {
  //         error: err.response
  //       }
  //     });
  //   }
  // };

  const updateSiteData = async (formData, history, edit = false) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const request = await axios.post(
        `${SITE_SERVER}/site_data`,
        formData,
        config
      );

      setStateDispatch({
        type: UPDATE_SITE_FOOTER_DATA,
        payload: request
      });

      console.log('Updated Successfully');
    } catch (err) {
      const errors = err.response.data.errors;

      console.log('UPDATE SITE FOOTER ERROR:  ====', errors);

      setStateDispatch({
        type: SITE_FOOTER_DATA_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status
        }
      });
    }
  };

  return (
    <Fragment>
      <ManageSiteUpdateProvider.Provider
        value={{ setStateDispatch, getSiteFooterData, updateSiteData }}
      >
        <ManageSiteProvider.Provider
          value={{
            siteFooterInfo: state.siteFooterInfo,
            loading: state.loading
          }}
        >
          {children}
        </ManageSiteProvider.Provider>
      </ManageSiteUpdateProvider.Provider>
    </Fragment>
  );
};

export default ManageSite;
