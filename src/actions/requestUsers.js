import axios from 'axios';
import { URL, LOGIN, AUTOLOGIN, SIGNIN, LOGOUT } from '../helpers/constants';

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

export const userRegistration = user => async dispatch => {
  try {
    dispatch({
      type: REGISTERING_USER,
    });

    const urlCall = URL + SIGNIN;
    axios
      .post(
        urlCall,
        {
          user: {
            username: user.name,
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation,
          },
        }
      )
      .then(response =>  {
        localStorage.setItem("token", response.data.token)
        dispatch({
          type: USER_REGISTERED,
          payload: response.data,
        })}
      );
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

    const urlCall = URL + LOGIN;
    axios
      .post(
        urlCall,
        {
          user: {
            username: user.username,
            password: user.password,
          },
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token"),
          }
        }
      )
      .then(response => {
        localStorage.setItem("token", response.data.token)
        dispatch({
          type: USER_LOGED,
          payload: response.data,
        })}
      );
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
    const urlCall = URL + AUTOLOGIN;
    axios.get(urlCall,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token"),
        }
      }).then(response => {
      dispatch({
        type: RECEIVE_USERS,
        payload: response.data,
      });
    });
  } catch (error) {
    dispatch({
      type: ERROR_FETCHING_USERS,
      payload: error,
    });
  }
};

export const userLogout = () => async dispatch => {
  try {
    dispatch({
      type: LOGOUT_USER,
    });

    const urlCall = URL + LOGOUT;
    axios.delete(urlCall,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token"),
        }
      }).then(response => {
      dispatch({
        type: USER_LOGOUT,
        payload: response.data,
      });
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_ERROR,
      payload: error,
    });
  }
};
