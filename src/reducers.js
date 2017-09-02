import { combineReducers } from 'redux'
import {
  SET_USER_INFO,
} from './actions';

function userInfo(state = {}, action) {
  switch(action.type) {
    case SET_USER_INFO:
      return {...state, ...action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  userInfo,
});
