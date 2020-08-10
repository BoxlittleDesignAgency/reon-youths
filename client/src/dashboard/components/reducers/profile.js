import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  SENDING_REQUEST,
  REQUEST_FINISHED,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED
} from '../actions/types';

import { logout } from '../../../pages/components/auth/helpers';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload
      }
    case SENDING_REQUEST:
      return {
        ...state,
        loading: true
      };
    case REQUEST_FINISHED:
      return {
        ...state,
        loading: false
      };
    case UPDATE_PROFILE:
      return {
        ...state
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null
      };
      case ACCOUNT_DELETED:
      return {
        ...state,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
}
