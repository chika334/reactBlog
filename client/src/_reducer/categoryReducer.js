import {
  LOADING_CATEGORIES,
  LOADED_CATEGORIES,
  CREATE_TAG,
  ERROR_CATEGORIES,
  CREATE_CATEGORIES
} from '../_actions/types'

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  msg: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_CATEGORIES:
      return {
        ...state,
        isLoading: true
      }
    case LOADED_CATEGORIES:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      }
    case CREATE_CATEGORIES:
    case CREATE_TAG:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      }
    default:
      return state;
  }
} 