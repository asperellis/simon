import { combineReducers } from 'redux';
import { user } from './User';
import { searchSettings, isLoading } from './UI';

const appReducer = combineReducers({
  user,
  searchSettings,
  isLoading
});

export default appReducer;
