import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import LogOut from './logout';
//import NavFooter from './NavFooter';

const Nav = () => {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.users);

  if (userState.loggedIn) {
    return (
      <div id="nav-links" className="pl-3 py-2 w-100 border-bottom mb-3 d-flex justify-content-between">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            &nbsp;<i class="fas fa-bars"></i>&nbsp;&nbsp;
          </Dropdown.Toggle>
        
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link className="menu-item" to="/" key="places">
                <li id="home">Places</li>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link className="menu-item" to="/rent_dates" key="rentEvents">
                <li id="dates">Schedule Rents</li>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link className="menu-item"
                to="/add-place"
                key="add-place"
              >
                <li id="add-place">Add a Rent Place</li>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
                <LogOut />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className="mr-4 align-self-center">
          Welcome <b>{userState.user.username}</b> !
        </div>
      </div>
    );
  }

  return (
    <nav className="py-2 w-100 border-bottom mb-3">
      <ul id="nav-links" className="d-flex list-nav justify-content-between w-100">
        <Link className="list-nav-item" to="/login" key="login">
          <li id="login">Log In</li>
        </Link>
        <Link className="list-nav-item" to="/register" key={userState.loggedIn}>
          <li id="register">Sign Up</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;