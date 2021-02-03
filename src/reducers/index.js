import { combineReducers } from 'redux';
import houses from './houses';
import users from './users';
import favorites from './favorites';
import scheduled from './rentDates';
import message from './message';

const combinedReducer = combineReducers({
  houses,
  users,
  favorites,
  scheduled,
  message,
});

export default combinedReducer;
