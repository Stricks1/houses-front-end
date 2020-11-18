import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import combinedReducer from '../reducers';

const store = createStore(
  combinedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;