import { CHANGE_MESS } from '../actions/messages';

function message(state = '', action) {
  switch (action.type) {
    case CHANGE_MESS:
      return action.payload;
    default:
      return state;
  }
}

export default message;
