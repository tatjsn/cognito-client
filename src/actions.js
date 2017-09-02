export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_ECHO = 'SET_ECHO';

export const setUserInfo = (userInfo) => ({ type: SET_USER_INFO, payload: userInfo });
export const setEcho = (echo) => ({ type: SET_ECHO, payload: echo });
