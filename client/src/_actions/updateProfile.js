import axios from 'axios'
import {
  UPDATE_USER,
  UPDATE_IMAGE_USER,
  USER_IMAGE_LOADING,
  USER_IMAGE_LOADED
} from './types';
import {tokenConfig} from './user_actions';
import {returnErrors} from './error_action';

export const loadImage = () => (dispatch, getState) => {
  dispatch({ type: USER_IMAGE_LOADING })
    axios.get(`${process.env.REACT_APP_API}/loadUser`, tokenConfig(getState),{
      headers: {
        "content-type": "application/json"
      }
    }).then(res=> dispatch({
      type: USER_IMAGE_LOADED,
      payload: res.data
    }))
    .catch(err=>console.log(err))
}
// }

export const updateUser = (formData) => dispatch => {
  const config = {
    header: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  }
  // const body = JSON.stringify(users)
  console.log(formData)

  axios.post(`${process.env.REACT_APP_API}/updateImage`,formData,{
    headers: {
      "content-type": "application/json"
    }
  }).then(res=> dispatch({
    type: UPDATE_USER,
    payload: res.data
  }))
  .catch(err=>console.log(err))

}

// export const profileimage = (file) => dispatch => {
//   const config = {
//     header: {
//       'Content-Type': 'Application/json'
//     }
//   }

//   console.log(file)

//   axios.post(`${process.env.REACT_APP_API}/updateImage`, file, config)
//     .then(res => dispatch({
//       type: UPDATE_IMAGE_USER,
//       payload: res.data
//     }))
//     .catch(err => {
//       console.log(err)
//     })
// }

export const imageRegister = (formData) => (dispatch) => {

  const config = {
    header: {
      Accept: 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded'
      'Content-Type': 'multipart/form-data'
    }
  }

  // Request body
  // const body = ({ formData });
  console.log(formData)

  axios.put(`${process.env.REACT_APP_API}/updateImage`, formData, config)
    .then(res => dispatch({
      type: UPDATE_IMAGE_USER,
      payload: res.data
    }))
    .catch(err => {
      console.log(err)
      // dispatch(returnErrors(err.response.data, err.response.status, 'IMAGE_FAIL'));
      // dispatch({
      //   type: IMAGE_FAIL
      // });
    });
}