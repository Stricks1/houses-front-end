import { combineReducers } from 'redux';
import houses from './houses';

const combinedReducer = combineReducers({
  houses,
});

export default combinedReducer;