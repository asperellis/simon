import { combineReducers } from 'redux';

const location = (state = null, action) => {
  if (action.type === 'GET_USER_LOCATION') {
    return action.location;
  }

  return state;
};

const appReducer = combineReducers({
  location
});

export default appReducer;
