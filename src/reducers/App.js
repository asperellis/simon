import { combineReducers } from 'redux';
import { user } from './User';
import { searchSettings } from './UI';

const appReducer = combineReducers({
  user,
  searchSettings
});

export default appReducer;
