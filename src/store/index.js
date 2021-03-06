import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import combinedReducer from '../reducers';
import { userAutoLogIn } from '../actions/requestUsers';

const store = createStore(
  combinedReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

if (localStorage.getItem('token')) {
  store.dispatch(userAutoLogIn());
}

export default store;
