import {
  UPDATE_USER, 
  UPDATE_IMAGE_USER,
  USER_IMAGE_LOADING,
  USER_IMAGE_LOADED
} from '../_actions/types'

const initialState = {
  // token: localStorage.getItem('token'),
  isAuthenticate: false,
  isLoading: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_IMAGE_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_IMAGE_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuthenticate: true,
        isLoading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        ...action.payload,
        isAuthenticate: true,
        isLoading: false,
      };
    case UPDATE_IMAGE_USER:
      return {
        ...state,
        ...action.payload,
        isAuthenticate: true,
        // profileImage: action.payload,
        isLoading: false,
        // msg: action.payload
      };
    default:
      return state;
  }
}