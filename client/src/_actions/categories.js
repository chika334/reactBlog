import axios from 'axios';
import {CREATE_TAG, CREATE_CATEGORIES} from './types';

export const createCatgory = (cat) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  const body = JSON.stringify(cat)
  // console.log(body)

  axios.post(`${process.env.REACT_APP_API}/create-categories`, body, config)
    .then(res => dispatch({
      type: CREATE_CATEGORIES,
      payload: res.data
    }))
    .catch(err => console.log(err))
}

export const createTag = (cat) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  const body = JSON.stringify(cat)

  axios.post(`${process.env.REACT_APP_API}/create-tag`, body, config)
    .then(res => dispatch({
      type: CREATE_TAG,
      payload: res.data
    }))
    .catch(err => console.log(err))
}