import {CLEAR_ERROR, GET_ERROR} from '../_actions/types';

const initalState = {
  msg: {},
  status: null, 
  id: null
}

export default function (state = initalState, action) {
  switch (action.type) {
    case GET_ERROR:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      }
    case CLEAR_ERROR:
      return {
        msg: {},
        status: null, 
        id: null
      };
    default:
      return state;
  }
}