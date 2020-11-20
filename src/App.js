import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignupForm from './containers/signup';
import LogInForm from './containers/login';
import HousesList from './containers/home';
import HouseDetail from './containers/house';
import CreatePlaceForm from './containers/createPlace';
import Nav from './components/navbar';
import './index.css';

function App() {
  return (
    <div className="App">
      <div className="position-fixed navbar-top">
        <Nav />
      </div>
      <div className="main-container">
        <Switch>
          <Route path="/" exact component={HousesList} />
          <Route path="/add-place" exact component={CreatePlaceForm} />
          <Route path="/house/:id" exact component={HouseDetail}></Route>
          <Route path="/login" exact component={LogInForm} />
          <Route path="/register" exact component={SignupForm} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
