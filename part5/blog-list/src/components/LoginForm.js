import React from 'react';
import { useDispatch } from 'react-redux';

import { login } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useField } from '../hooks';

const LoginForm = () => {
  const dispatch = useDispatch();
  const username = useField('text', 'username');
  const password = useField('password', 'password');

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
    <form onSubmit={handleSubmit}>
      <div>
        username:
        <input {...usernameToPass} autoComplete="username" />
      </div>
      <div>
        password:
        <input {...passwordToPass} autoComplete="current-password" />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
