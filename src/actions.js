import { Actions as FarceActions } from 'farce';
import cognitoAuth from './cognito-auth';

export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

export const setUserInfo = (userInfo) => ({ type: SET_USER_INFO, payload: userInfo });
export const setLoginError = (loginError) => ({ type: SET_LOGIN_ERROR, payload: loginError });

export const login = (username, password) => (dispatch) =>
  cognitoAuth(username, password)
    .then((jwt) => {
      dispatch(setUserInfo({ jwt }));
      dispatch(FarceActions.push('/'));
    })
    .catch((error) => {
      dispatch(setLoginError({ error }));
    });
