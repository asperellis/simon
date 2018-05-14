import { combineReducers } from 'redux';

const user = (state = { location: null, status: 'LOGGED_OUT' }, action) => {
  if (action.type === 'GET_USER_LOCATION') {
    return { ...state, location: action.location };
  } else if (action.type === 'LOGIN_USER' || action.type === 'LOGOUT_USER') {
    return { ...state, status: action.status };
  }

  return state;
};

const appReducer = combineReducers({
  user
});

export default appReducer;
