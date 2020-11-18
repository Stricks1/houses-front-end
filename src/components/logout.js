import React from 'react';
import { useDispatch } from 'react-redux';
import { userLogout } from '../actions/requestUsers';

const LogOut = () => {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(userLogout());
  };

  return ( 
    <a className="menu-item" href="/" onClick={() => handleClick()}>Log Out</a>
  )
}

export default LogOut;