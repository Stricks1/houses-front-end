import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignupForm from './containers/signup';
import LogInForm from './containers/login';
import HousesList from './containers/home';
import SchedulesList from './containers/scheduledRents';
import FavList from './containers/favorites';
import HouseDetail from './containers/house';
import CreatePlaceForm from './containers/createPlace';
import EditPlaceForm from './containers/editPlace';
import Nav from './components/navbar';
import NotFound from './components/notFound';
import './index.css';

function App() {
  return (
    <div className="App">
      <div className="position-fixed navbar-top">
        <Nav />
      </div>
      <div className="main-container">
        <Switch>
          <Route path="/home" exact component={HousesList} />
          <Route path="/favorites" exact component={FavList} />
          <Route path="/add-place" exact component={CreatePlaceForm} />
          <Route path="/rent_dates" exact component={SchedulesList} />
          <Route path="/edit/:id" exact component={EditPlaceForm} />
          <Route path="/house/:id" exact component={HouseDetail} />
          <Route path="/" exact component={LogInForm} />
          <Route path="/register" exact component={SignupForm} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
