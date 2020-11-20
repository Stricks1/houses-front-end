import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { userLogin } from '../actions/requestUsers';
import ErrorMessageContainer from './errorMessages';
import logo from '../assets/loginImg.png';
import loadImg from '../assets/loadImg.gif';

const LogInForm = () => {
  let username = React.createRef();
  let password = React.createRef();
  const dispatch = useDispatch();
  const userState = useSelector(state => state.users);
  const history = useHistory();

  useEffect(() => {
    if (userState.user.username) {
      history.push('/');
    }
  }, [history, userState.user.username]);

  return (
    <div>
      { userState.isFetching
        && (
          <div data-testid="loading" className="bg-load">
            <img className="image-load" src={loadImg} alt="loadingImage" />
          </div>
        )}
      { !userState.isFetching
      && (
      <div className="Login d-flex flex-column">
        <img src={logo} alt="LogoImage" className="logoCenter align-self-center" />
        <Form
          onSubmit={e => {
            e.preventDefault();
            username.classList.remove('error');
            password.classList.remove('error');
            if (!password.value.trim()) {
              password.classList.add('error');
            }
            if (!username.value.trim()) {
              username.classList.add('error');
              username.focus();
              return;
            }
            if (!password.value.trim()) {
              password.classList.add('error');
              password.focus();
              return;
            }
            const loginfo = {
              username: username.value,
              password: password.value,
            };
            password.value = '';
            dispatch(userLogin(loginfo));
          }}
        >
          <Form.Group size="lg" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              ref={self => { (username = self); }}
              autoFocus
              placeholder="Type your Username..."
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              ref={self => { (password = self); }}
              placeholder="Type your Password..."
            />
          </Form.Group>
          <Button block size="lg" type="submit">
            Login
          </Button>
        </Form>
        <ErrorMessageContainer />
      </div>
      )}
    </div>
  );
};

export default LogInForm;
