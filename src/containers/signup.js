import React, { useEffect } from 'react';
import ErrorMessageContainer from './errorMessages'
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userRegistration } from '../actions/requestUsers';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import loadImg from '../assets/loadImg.gif';

const SignupForm = () => {
  let username
  let email
  let password
  let password_confirmation
  const dispatch = useDispatch();
  const userState = useSelector(state => state.users);
  let history = useHistory();

  useEffect(() => {
    if (userState.user.username) {
      history.push('/')
      return
    }
  }, [history, userState.user.username]);


  return (
    <div>
      { userState.isFetching && 
        (
          <div data-testid="loading" className="bg-load">
            <img className="image-load" src={loadImg} alt="loadingImage" />
          </div>
        )
      }
      { !userState.isFetching && 
      (<div className="Login">
        <Form
          onSubmit={e => {
            e.preventDefault()
            username.classList.remove('error');
            email.classList.remove('error');
            password.classList.remove('error');
            password_confirmation.classList.remove('error');
            if (!password.value.trim()) {
              password.classList.add('error');
            }
            if (!email.value.trim()) {
              email.classList.add('error');
            }
            if (!password_confirmation.value.trim()) {
              password_confirmation.classList.add('error');
            }
            if (!username.value.trim()) {
              username.classList.add('error');
              username.focus()
              return
            }
            if (!email.value.trim()) {
              email.focus()
              return
            }
            if (!password.value.trim()) {
              password.focus()
              return
            }
            if (!password_confirmation.value.trim()) {
              password_confirmation.focus()
              return
            }
            let user = {
              username: username.value,
              email: email.value,
              password: password.value,
              password_confirmation: password_confirmation.value,
            }
            dispatch(userRegistration(user));
            password.value = ''
            password_confirmation.value = ''
          }}
        >
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            autoFocus
            ref={self => (username = self)} 
            placeholder="Type your Username..."
          />
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control ref={self => (email = self)} 
            placeholder="Type your Email..."
          />
        </Form.Group>
        <Form.Group size="lg" controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={self => (password = self)} 
            placeholder="Create a Secure Password..."
          />
        </Form.Group>
        <Form.Group size="lg" controlId="ConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" ref={self => (password_confirmation = self)} 
            placeholder="Confirm Password..."
          />
        </Form.Group>
        <Button block size="lg" type="submit">
          Register
        </Button>
        </Form>
        <ErrorMessageContainer />
      </div>)
      }
    </div>
  )
}


export default SignupForm;