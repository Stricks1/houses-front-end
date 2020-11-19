import React from 'react';
import ErrorMessageContainer from './errorMessages'
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../actions/requestUsers';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import logo from '../assets/loginImg.png';

const LogInForm = () => {
  let username
  let password
  const dispatch = useDispatch();
  const userState = useSelector(state => state.users);
  if (userState.user.username) {
    return (<Redirect to="/" />);
  }

  return (
    <div>
      <div className="Login d-flex flex-column">
        <img src={logo} alt='LogoImage' className="logoCenter align-self-center" />
        <Form
          onSubmit={e => {
            e.preventDefault()
            username.classList.remove('error');
            password.classList.remove('error');
            if (!password.value.trim()) {
              password.classList.add('error');
            }
            if (!username.value.trim()) {
              username.classList.add('error');
              username.focus()
              return
            }
            if (!password.value.trim()) {
              password.classList.add('error');
              password.focus()
              return
            }
            let loginfo = {
              username: username.value,
              password: password.value
            }
            dispatch(userLogin(loginfo));
            password.value = ''
          }}
        >
          <Form.Group size="lg" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control ref={self => (username = self)}
              autoFocus 
              placeholder="Type your Username..."
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={self => (password = self)} 
              placeholder="Type your Password..."
            />
          </Form.Group>
          <Button block size="lg" type="submit">
            Login
          </Button>
        </Form>
        <ErrorMessageContainer />
      </div>
    </div>
  )
}

export default LogInForm;