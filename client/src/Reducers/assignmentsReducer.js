// Reducer for assignments (list, create, delete)
import { SHOW_ASSIGNMENTS, DELETE_ASSIGNMENT } from '../Actions/types.js';

const initialState = {
  assignments: [] // ** make sure set to array []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SHOW_ASSIGNMENTS:
      return {
        ...state,
        assignments: action.payload
      }
    case DELETE_ASSIGNMENT:
      return {
        ...state,
        assignments: state.assignments.filter(assignment => assignment.id !== action.payload)
        // updates assignments state, filtering out deleted assignment
      }
    default:
      return state;
  }
};
