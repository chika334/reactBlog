import {combineReducers} from 'redux'
import auth from './user';
import error from './error'
import update from './updateReducer'
import category from './categoryReducer'

export default combineReducers({
  auth,
  error,
  update,
  category
})