import { PLACES } from '../helpers/constants';
import { sendAuthorizedRequest } from '../helpers/api';

export const LOAD_HOUSES = 'LOAD_HOUSES';
export const RECEIVE_HOUSES = 'RECEIVE_HOUSES';
export const ERROR_FETCHING_HOUSES = 'ERROR_FETCHING_HOUSES';

export const housesLoad = (redirect = 0, history = null) => async dispatch => {
  try {
    dispatch({
      type: LOAD_HOUSES,
    });
    sendAuthorizedRequest('get', PLACES, localStorage.getItem('token')).then(response => {
      const dataReturn = response.data;
      dispatch({
        type: RECEIVE_HOUSES,
        payload: dataReturn,
      });
      if (redirect > 0) {
        history.push(`/house/${redirect}`);
      }
    },
    error => {
      dispatch({
        type: ERROR_FETCHING_HOUSES,
        payload: error,
      });
    });
  } catch (error) {
    dispatch({
      type: ERROR_FETCHING_HOUSES,
      payload: error,
    });
  }
};
