import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  USER_LOADING,
  USER_LOADED,
  REGISTER_FAIL,
  LOGIN_FAIL,
  AUTH_ERROR,
  FORGOT_FAIL,
  FORGOT_PASS
} from '../_actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  user: null,
  msg: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case REGISTER_USER:
    case LOGIN_USER:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT_USER: {
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        isLoading: false
      }
    }
    case FORGOT_PASS:
    case FORGOT_FAIL:
      return {
        ...state,
        ...action.payload,
        msg: {...action.payload}
      }
    default:
      return state;
  }
}