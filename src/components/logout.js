import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userLogout } from '../actions/requestUsers';

const LogOut = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  function handleClick() {
    dispatch(userLogout());
    history.push('/login');
  }

  return (
    <a className="menu-item pl-2 dropdown-item" href="/" onClick={() => handleClick()}>Log Out</a>
  );
};

export default LogOut;
