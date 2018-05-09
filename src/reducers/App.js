import { combineReducers } from 'redux';

const user = (state = { location: null }, action) => {
  if (action.type === 'GET_USER_LOCATION') {
    return { ...state, location: action.location };
  }

  return state;
};

const appReducer = combineReducers({
  user
});

export default appReducer;
