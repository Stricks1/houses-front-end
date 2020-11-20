import { combineReducers } from 'redux';
import houses from './houses';
import users from './users';
import message from './message';

const combinedReducer = combineReducers({
  houses,
  users,
  message
});

export default combinedReducer;