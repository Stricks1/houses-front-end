import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userAutoLogIn } from './actions/requestUsers';
import SignupForm from './containers/signup';
import LogInForm from './containers/login';
import LogOut from './containers/logout';
import './index.css';

function App() {
  const dispatch = useDispatch();

  if (localStorage.getItem("token")){
    dispatch(userAutoLogIn());
  } else {
    console.log('sem autoLogin')
  }

  return (
    <div className="App row">
      <SignupForm />
      <LogInForm />
      <LogOut />
    </div>
  );
}

export default App;
