import React from 'react';
import ErrorMessageContainer from './errorMessages'
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userRegistration } from '../actions/requestUsers';

const SignupForm = () => {
  let username
  let email
  let password
  let password_confirmation
  const dispatch = useDispatch();
  const userState = useSelector(state => state.users);
  if (userState.user.username) {
    return (<Redirect to="/" />);
  }
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!username.value.trim()) {
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
      <input ref={self => (username = self)} 
        placeholder="Type your Username..."
      />
      <input ref={self => (email = self)} 
        placeholder="Type your Email..."
      />
      <input type="password" ref={self => (password = self)} 
        placeholder="Create a Secure Password..."
      />
      <input type="password" ref={self => (password_confirmation = self)} 
        placeholder="Confirm Password..."
      />
        <button type="submit">Sign Up</button>
      </form>
      <ErrorMessageContainer />
    </div>
  )
}


export default SignupForm;