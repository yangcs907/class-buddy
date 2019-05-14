import axios from 'axios';
import setAuthWebToken from '../utils/setAuthWebToken.js';
import jwt_decode from 'jwt-decode';
import { GET_ERROR_MESSAGES, SET_CURRENT_USER, SET_CURRENT_USER_INFO, SHOW_WEB_TOKEN } from './types.js';

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
  .post('/users/register', userData)
  .then(res => {
    history.push('/login');
    alert(`Success! ${userData.name}, you can now log in`)
  })  //redirects user to login page after registration
  .catch(err =>
    dispatch({
      type: GET_ERROR_MESSAGES,
      payload: err.response.data
    })
  );
};

// Login - get user web token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post('/users/login', userData)
    .then(res => {
      // save token to local storage
      const webToken = res.data.token;
      localStorage.setItem('jwtToken', webToken);
      // set token to authorization header
      setAuthWebToken(webToken);
      // decode token to get user user data
      const decodedToken = jwt_decode(webToken);
      // set current user
      dispatch(setCurrentUser(decodedToken));
      dispatch(setCurrentUserInfo(userData));
      dispatch(showWebToken(res.data));
    })
    .catch(err =>
      dispatch({
        type: GET_ERROR_MESSAGES,
        payload: err.response.data
      }));
};

// set logged in user
export const setCurrentUser = (decodedToken) => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken
  }
};

// for testing, shows user info
export const setCurrentUserInfo = (info) => {
  return {
    type: SET_CURRENT_USER_INFO,
    payload: info
  }
};

// for testing, shows web token
export const showWebToken = (token) => {
  return {
    type: SHOW_WEB_TOKEN,
    payload: token
  }
}

// log out user
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  // remove auth header
  setAuthWebToken(false);
  // set current user to empty object, which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
