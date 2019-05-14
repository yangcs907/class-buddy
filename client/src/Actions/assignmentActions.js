// Actions for assignments (create, list, delete)
import { SHOW_ASSIGNMENTS, GET_ERROR_MESSAGES, DELETE_ASSIGNMENT } from './types.js';
import axios from 'axios';

// gets assignments from canvas api
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

// deletes assignment based on id param
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

// creates new assignment to canvas api
export const createAssignment = (newAssignment) => dispatch => {
  axios
    .post('/course/create-assignment', newAssignment)
    .then(response => {
      alert('Successfully created new assignment!');
    })
    .catch(err => {
      dispatch({
        type: GET_ERROR_MESSAGES,
        payload: err.response.data
      })
    })
};
