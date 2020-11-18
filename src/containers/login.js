import React from 'react';
import ErrorMessageContainer from './errorMessages'
import { useDispatch } from 'react-redux';
import { userLogin } from '../actions/requestUsers';

const LogInForm = () => {
  let username
  let password
  const dispatch = useDispatch();

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!username.value.trim()) {
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
      <input ref={self => (username = self)} 
        placeholder="Type your Username..."
      />
      <input type="password" ref={self => (password = self)} 
        placeholder="Type your Password..."
      />
        <button type="submit">Log In</button>
      </form>
      <ErrorMessageContainer />
    </div>
  )
}

export default LogInForm;