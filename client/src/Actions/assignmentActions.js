import axios from 'axios';
import setAuthWebToken from '../utils/setAuthWebToken.js';
import jwt_decode from 'jwt-decode';
import { SHOW_ASSIGNMENTS, GET_ERROR_MESSAGES } from './types.js';

export const getAssignments = () => dispatch => {
  axios
    .get('/course/assignments')
    .then(res => {
      dispatch({
        type: SHOW_ASSIGNMENTS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: SHOW_ASSIGNMENTS,
        payload: null
      });
      console.log(err);
    })
};
