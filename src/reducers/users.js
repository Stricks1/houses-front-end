import {
  REGISTERING_USER,
  USER_REGISTERED,
  REGISTRATION_ERROR,
  LOGIN_USER,
  USER_LOGED,
  LOGIN_ERROR,
  LOAD_USERS,
  RECEIVE_USERS,
  ERROR_FETCHING_USERS,
  LOGOUT_USER,
  USER_LOGOUT,
  LOGOUT_ERROR,
  CLEAR_ERRORS,
} from '../actions/requestUsers';

const initialState = {
  user: {},
  isFetching: false,
  loggedIn: false,
  errors: [],
};

const users = (state = initialState, action) => {
  const { type, payload } = action;

  let errors = '';
  let entries = '';
  let errorArray = [];
  switch (type) {
    case REGISTERING_USER:
      return {
        ...state,
        isFetching: true,
      };

    case REGISTRATION_ERROR:
      errors = payload;
      entries = Object.entries(errors);
      errorArray = [];
      entries.forEach(element => errorArray.push(element));
      return {
        ...state,
        isFetching: false,
        errors: errorArray,
      };

    case USER_REGISTERED:
      return {
        ...state,
        isFetching: false,
        loggedIn: !!payload.data.token,
        user: payload.data.user,
        errors: [],
      };

    case LOGIN_USER:
      return {
        ...state,
        isFetching: true,
      };

    case USER_LOGED:
      return {
        ...state,
        isFetching: false,
        loggedIn: !!payload.data.token,
        user: payload.data.user,
        errors: [],
      };

    case LOGIN_ERROR:
      errors = payload;
      entries = Object.entries(errors);
      errorArray = [];
      entries.forEach(element => errorArray.push(element));
      return {
        ...state,
        isFetching: false,
        errors: errorArray,
      };

    case LOAD_USERS:
      return {
        ...state,
        isFetching: true,
      };

    case RECEIVE_USERS:
      return {
        ...state,
        isFetching: false,
        loggedIn: true,
        user: payload.user,
      };

    case ERROR_FETCHING_USERS:
      return {
        ...state,
        isFetching: false,
      };

    case LOGOUT_USER:
      return {
        ...state,
        isFetching: true,
      };

    case USER_LOGOUT:
      return {
        ...state,
        isFetching: false,
        loggedIn: false,
        user: {},
        errors: [],
      };

    case LOGOUT_ERROR:
      return {
        ...state,
        isFetching: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        errors: payload,
      };

    default:
      return state;
  }
};

export default users;
