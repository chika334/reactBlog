import {combineReducers} from 'redux'
import auth from './user';
import error from './error'
import update from './updateReducer'

export default combineReducers({
  auth,
  error,
  update
})