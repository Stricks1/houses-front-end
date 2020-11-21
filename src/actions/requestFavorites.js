import axios from 'axios';
import { URL, FAVORITES } from '../helpers/constants';

export const LOAD_FAVORITES = 'LOAD_FAVORITES';
export const RECEIVE_FAVORITES = 'RECEIVE_FAVORITES';
export const ERROR_FETCHING_FAVORITES = 'ERROR_FETCHING_FAVORITES';

export const favoritesLoad = () => async dispatch => {
  try {
    dispatch({
      type: LOAD_FAVORITES,
    });
    const urlCall = URL + FAVORITES;
    axios.get(urlCall,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then(response => {
      const dataReturn = response.data;
      dispatch({
        type: RECEIVE_FAVORITES,
        payload: dataReturn,
      });
    },
    error => {
      dispatch({
        type: ERROR_FETCHING_FAVORITES,
        payload: error.response.data,
      });
    });
  } catch (error) {
    dispatch({
      type: ERROR_FETCHING_FAVORITES,
      payload: error,
    });
  }
};
