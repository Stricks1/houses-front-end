import { combineReducers } from 'redux';
import houses from './houses';
import users from './users';
import favorites from './favorites';
import message from './message';

const combinedReducer = combineReducers({
  houses,
  users,
  favorites,
  message,
});

export default combinedReducer;
