import React from 'react';
import { useDispatch } from 'react-redux';
import { userLogout } from '../actions/requestUsers';

const LogOut = () => {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(userLogout());
  };

  return ( 
    <button type="button" onClick={() => handleClick()}>Log Out</button>
  )
}

export default LogOut;