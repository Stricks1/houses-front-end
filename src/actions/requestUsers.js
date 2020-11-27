import {
  LOGIN, AUTOLOGIN, SIGNIN, LOGOUT,
} from '../helpers/constants';
import { sendUnauthenticatedRequest, sendAuthorizedRequest } from '../helpers/api';

export const REGISTERING_USER = 'REGISTERING_USER';
export const USER_REGISTERED = 'USER_REGISTERED';
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';
export const LOGIN_USER = 'LOGIN_USER';
export const USER_LOGED = 'USER_LOGED';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOAD_USERS = 'LOAD_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ERROR_FETCHING_USERS = 'ERROR_FETCHING_USERS';
export const LOGOUT_USER = 'LOGOUT_USER';
export const USER_LOGOUT = 'USER_LOGOUT';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const userRegistration = user => async dispatch => {
  try {
    dispatch({
      type: REGISTERING_USER,
    });

    const dataSent = {
      user: {
        username: user.username,
        email: user.email,
        password: user.password,
        password_confirmation: user.password_confirmation,
      },
    };
    sendUnauthenticatedRequest('post', SIGNIN, dataSent)
      .then(response => {
        localStorage.setItem('token', response.data.data.token);
        dispatch({
          type: USER_REGISTERED,
          payload: response.data,
        });
      },
      error => {
        dispatch({
          type: REGISTRATION_ERROR,
          payload: error.response.data,
        });
      });
  } catch (error) {
    dispatch({
      type: REGISTRATION_ERROR,
      payload: error,
    });
  }
};

export const userLogin = user => async dispatch => {
  try {
    dispatch({
      type: LOGIN_USER,
    });
    const dataSent = {
      username: user.username,
      password: user.password,
    };
    sendUnauthenticatedRequest('post', LOGIN, dataSent)
      .then(response => {
        if (response.data.errors) {
          const errorArr = { Failure: [[response.data.errors]] };
          dispatch({
            type: LOGIN_ERROR,
            payload: errorArr,
          });
        } else {
          localStorage.setItem('token', response.data.data.token);
          dispatch({
            type: USER_LOGED,
            payload: response.data,
          });
        }
      });
  } catch (error) {
    dispatch({
      type: LOGIN_ERROR,
      payload: error,
    });
  }
};

export const userAutoLogIn = () => async dispatch => {
  try {
    dispatch({
      type: LOAD_USERS,
    });
    sendAuthorizedRequest('get', AUTOLOGIN, localStorage.getItem('token'))
      .then(response => {
        if (response.data.errors) {
          const errorArr = { Failure: [[response.data.errors]] };
          dispatch({
            type: ERROR_FETCHING_USERS,
            payload: errorArr,
          });
        } else {
          dispatch({
            type: RECEIVE_USERS,
            payload: response.data,
          });
        }
      });
  } catch (error) {
    dispatch({
      type: ERROR_FETCHING_USERS,
      payload: error,
    });
  }
};

export const userLogout = (history = null) => async dispatch => {
  try {
    dispatch({
      type: LOGOUT_USER,
    });
    sendAuthorizedRequest('get', LOGOUT, localStorage.getItem('token'))
      .then(response => {
        localStorage.removeItem('token');
        dispatch({
          type: USER_LOGOUT,
          payload: response.data,
        });
        history.push('/');
      }, () => {
        localStorage.removeItem('token');
        dispatch({
          type: LOGOUT_ERROR,
          payload: '',
        });
      });
  } catch (error) {
    dispatch({
      type: LOGOUT_ERROR,
      payload: error,
    });
  }
};

export const clearErrors = () => (
  {
    type: CLEAR_ERRORS,
    payload: [],
  }
);
