import isEmpty from '../validation/emptyCheck.js';
import { SHOW_ASSIGNMENTS } from '../Actions/types.js';

const initialState = {
  assignments: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SHOW_ASSIGNMENTS:
      return {
        ...state,
        assignments: action.payload
      }
    default:
      return state;
  }
};
