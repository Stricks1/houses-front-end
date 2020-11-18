import { combineReducers } from 'redux';
import filter from './filter';
import houses from './houses';

const combinedReducer = combineReducers({
  filter,
  houses,
});

export default combinedReducer;