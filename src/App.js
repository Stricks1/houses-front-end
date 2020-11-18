import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignupForm from './containers/signup';
import LogInForm from './containers/login';
import LogOut from './containers/logout';
import './index.css';

function App() {
  return (
    <div className="App row">
      <SignupForm />
      <LogInForm />
      <LogOut />
  </div>
  );
}

export default App;
