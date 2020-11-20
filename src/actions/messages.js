const CHANGE_MESS = 'CHANGE_MESS';

const ChangeMessage = message => (
  {
    type: CHANGE_MESS,
    message,
  }
);

export {  CHANGE_MESS, ChangeMessage };