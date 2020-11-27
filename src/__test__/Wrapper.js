import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import PropTypes from 'prop-types';
import combinedReducer from '../reducers';

const store = createStore(
  combinedReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

const Wrapper = ({ children }) => (
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>{children}</BrowserRouter>
    </React.StrictMode>
  </Provider>
);

Wrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Wrapper;
