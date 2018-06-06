import { combineReducers } from 'redux';

const user = (state = { location: {}, status: 'LOGGED_OUT' }, action) => {
  if (action.type === 'GET_USER_LOCATION') {
    return { ...state, location: action.location };
  } else if (action.type === 'LOGIN_USER' || action.type === 'LOGOUT_USER') {
    return { ...state, status: action.status };
  }

  return state;
};

const searchSettings = (state = { toggle: true, include: true }, action) => {
  if (action.type === 'SET_SEARCH') {
    return { ...state, include: action.include };
  } else if (action.type === 'SET_SEARCH_TOGGLE') {
    return { ...state, toggle: action.toggle };
  }
  return state;
};

const appReducer = combineReducers({
  user,
  searchSettings
});

export default appReducer;
