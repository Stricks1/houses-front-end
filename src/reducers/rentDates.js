import {
  LOAD_RENTDATE,
  RECEIVE_RENTDATE,
  ERROR_FETCHING_RENTDATE,
} from '../actions/requestScheduled';

const initialState = {
  isFetching: false,
  scheduled: [],
  status: '',
};

const scheduled = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_RENTDATE:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_RENTDATE: {
      const objectFormated = [];
      payload.data.forEach(element => {
        objectFormated.push(element);
      });
      return {
        ...state,
        isFetching: false,
        scheduled: objectFormated,
      };
    }
    case ERROR_FETCHING_RENTDATE:
      return {
        ...state,
        isFetching: false,
        scheduled: payload,
      };

    default:
      return state;
  }
};

export default scheduled;
