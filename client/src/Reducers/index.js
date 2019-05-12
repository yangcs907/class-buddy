// root reducer
import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import getErrorsReducer from './getErrorsReducer.js';
import assignmentsReducer from './assignmentsReducer.js';

export default combineReducers({
  authenticate: authenticationReducer,
  errorMessages: getErrorsReducer,
  assignments: assignmentsReducer
});
