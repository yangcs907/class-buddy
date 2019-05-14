import axios from 'axios';
import setAuthWebToken from '../utils/setAuthWebToken.js';
import jwt_decode from 'jwt-decode';
import { SHOW_ASSIGNMENTS, GET_ERROR_MESSAGES, DELETE_ASSIGNMENT } from './types.js';

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
export const deleteAssignment = (id) => dispatch => {
  if (window.confirm('This can not be undone, are you sure you want to delete this assignment?')) {
  axios
    .delete(`/course/assignments/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_ASSIGNMENT,
        payload: id
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERROR_MESSAGES,
        payload: err.response.data
      });
      console.log(err);
    })
  }
};
