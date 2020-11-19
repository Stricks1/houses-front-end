import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignupForm from './containers/signup';
import LogInForm from './containers/login';
import Nav from './components/navbar';
import './index.css';

function App() {
  
/*
  <SignupForm />
  <LogInForm />
  <LogOut />
    <Route path="/" exact component={Home} />
      
*/
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/login" exact component={LogInForm} />
        <Route path="/register" exact component={SignupForm} />
      </Switch>
    </div>
  );
}

export default App;
