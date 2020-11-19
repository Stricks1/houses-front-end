import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignupForm from './containers/signup';
import LogInForm from './containers/login';
import HousesList from './containers/home';
import Nav from './components/navbar';
import './index.css';

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/" exact component={HousesList} />
        <Route path="/login" exact component={LogInForm} />
        <Route path="/register" exact component={SignupForm} />
      </Switch>
    </div>
  );
}

export default App;
