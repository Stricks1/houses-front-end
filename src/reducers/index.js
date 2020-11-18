import { combineReducers } from 'redux';
import houses from './houses';
import users from './users';

const combinedReducer = combineReducers({
  houses,
  users
});

export default combinedReducer;