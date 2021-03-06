import { FAVORITES } from '../helpers/constants';
import { sendAuthorizedRequest } from '../helpers/api';

export const LOAD_FAVORITES = 'LOAD_FAVORITES';
export const RECEIVE_FAVORITES = 'RECEIVE_FAVORITES';
export const ERROR_FETCHING_FAVORITES = 'ERROR_FETCHING_FAVORITES';

export const favoritesLoad = () => async dispatch => {
  try {
    dispatch({
      type: LOAD_FAVORITES,
    });
    sendAuthorizedRequest('get', FAVORITES, localStorage.getItem('token')).then(response => {
      const dataReturn = response.data;
      dispatch({
        type: RECEIVE_FAVORITES,
        payload: dataReturn,
      });
    },
    error => {
      dispatch({
        type: ERROR_FETCHING_FAVORITES,
        payload: error,
      });
    });
  } catch (error) {
    dispatch({
      type: ERROR_FETCHING_FAVORITES,
      payload: error,
    });
  }
};
