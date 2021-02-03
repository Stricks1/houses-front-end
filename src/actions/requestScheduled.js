import { RENTDATE } from '../helpers/constants';
import { sendAuthorizedRequest } from '../helpers/api';

export const LOAD_RENTDATE = 'LOAD_RENTDATE';
export const RECEIVE_RENTDATE = 'RECEIVE_RENTDATE';
export const ERROR_FETCHING_RENTDATE = 'ERROR_FETCHING_RENTDATE';

export const scheduledLoad = () => async dispatch => {
  try {
    dispatch({
      type: LOAD_RENTDATE,
    });
    sendAuthorizedRequest('get', RENTDATE, localStorage.getItem('token')).then(response => {
      const dataReturn = response.data;
      dispatch({
        type: RECEIVE_RENTDATE,
        payload: dataReturn,
      });
    },
    error => {
      dispatch({
        type: ERROR_FETCHING_RENTDATE,
        payload: error,
      });
    });
  } catch (error) {
    dispatch({
      type: ERROR_FETCHING_RENTDATE,
      payload: error,
    });
  }
};
