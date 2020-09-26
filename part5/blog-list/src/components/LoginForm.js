import React from 'react';
import { useDispatch } from 'react-redux';
import Togglable from './Togglable';
import { login } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useField } from '../hooks';

const LoginForm = () => {
  const dispatch = useDispatch();
  const username = useField('text');
  const password = useField('password');

  const { reset: usernameReset, ...usernameToPass } = username;
  const { reset: passwordReset, ...passwordToPass } = password;

  const reset = () => {
    return [username, password].forEach((field) => field['reset']());
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(login({ username: username.value, password: password.value }));
      reset();
    } catch (error) {
      dispatch(setNotification({ message: 'Wrong credentials', type: 'error' }));
    }
  };

  return (
    <Togglable buttonLabel="log in">
      <form onSubmit={handleSubmit}>
        <div>
          username:
          <input {...usernameToPass} id="username" autoComplete="username" />
        </div>
        <div>
          password:
          <input {...passwordToPass} id="password" autoComplete="current-password" />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </Togglable>
  );
};

export default LoginForm;
