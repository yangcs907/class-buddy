import isEmpty from '../validation/emptyCheck.js';
import { SET_CURRENT_USER, SET_CURRENT_USER_INFO, SHOW_WEB_TOKEN } from '../Actions/types.js';

const initialState = {
  isAuthenticated: false,
  user: {},
  userInfo: {},
  webTokenInfo: {}
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    case SET_CURRENT_USER_INFO:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        userInfo: action.payload
      }
    case SHOW_WEB_TOKEN:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        webTokenInfo: action.payload
      }
    default:
      return state;
  }
};
