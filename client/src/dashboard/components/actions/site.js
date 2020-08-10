import axios from 'axios';

import { getCookie } from '../../../pages/components/auth/helpers';

import {
  useManageSite,
  useManageSiteUpdate
} from '../../../globalcontext/manageSite';

import { GET_SITE_FOOTER_DATA, UPDATE_SITE_FOOTER_DATA } from './types';

const token = getCookie('token');
const SITE_SERVER = '/api/site';

//Get Footer Info
export const getSiteData = () => {
  
  return getSiteDataAsync()
    .then((response) => {
      console.log('Recieved data from SERVER API.......Yay!!!!!!!');
      // console.log('RESPONSE: ->', response);
    
      return response.data;
    })
    .catch((error) => {
      console.log('Error from below ->', error);
    });
};

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

//Update Footer Info
export const updateFooterInfo = () => async () => {};
