import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import LogOut from './logout';
import { clearErrors } from '../actions/requestUsers';

const Nav = () => {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.users);

  function handleClick() {
    dispatch(clearErrors());
  }

  if (userState.loggedIn) {
    return (
      <div id="nav-links" className="pl-3 py-2 w-100 border-bottom d-flex justify-content-between">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            &nbsp;
            <i className="fas fa-bars" />
&nbsp;&nbsp;
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as={Link} className="pl-2" to="/">
              Places
            </Dropdown.Item>
            <Dropdown.Item as={Link} className="pl-2" to="/rent_dates">
              Schedule Rents
            </Dropdown.Item>
            <Dropdown.Item as={Link} className="pl-2" to="/add-place">
              Add a Rent Place
            </Dropdown.Item>
            <Dropdown.Item as={Link} className="pl-2" to="/favorites">
              Favorite Places
            </Dropdown.Item>
            <Dropdown.Item as={LogOut} className="pl-2" />
          </Dropdown.Menu>
        </Dropdown>
        <div className="mr-4 align-self-center">
          Welcome
          {' '}
          <b>{userState.user.username}</b>
          {' '}
          !
        </div>
      </div>
    );
  }

  return (
    <nav className="py-2 w-100 border-bottom">
      <ul id="nav-links" className="d-flex list-nav justify-content-between w-100">
        <Link onClick={() => handleClick()} className="list-nav-item" to="/" key="login">
          <li id="login">Log In</li>
        </Link>
        <Link onClick={() => handleClick()} className="list-nav-item" to="/register" key={userState.loggedIn}>
          <li id="register">Sign Up</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
