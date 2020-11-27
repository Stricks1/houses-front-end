import {
  LOAD_FAVORITES,
  RECEIVE_FAVORITES,
  ERROR_FETCHING_FAVORITES,
} from '../actions/requestFavorites';

const initialState = {
  isFetching: false,
  favorite: [],
  status: '',
};

const favorites = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_FAVORITES:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_FAVORITES: {
      const objectFormated = [];
      payload.data.forEach(element => {
        objectFormated.push(element.attributes.place_id);
      });
      return {
        ...state,
        isFetching: false,
        favorite: objectFormated,
      };
    }
    case ERROR_FETCHING_FAVORITES:
      return {
        ...state,
        isFetching: false,
        places: payload,
      };

    default:
      return state;
  }
};

export default favorites;
