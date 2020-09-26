import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
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
          <TextField variant="outlined" size="small" {...usernameToPass} id="username" autoComplete="username" />
        </div>
        <div>
          password:
          <TextField
            variant="outlined"
            size="small"
            {...passwordToPass}
            id="password"
            autoComplete="current-password"
          />
        </div>
        <Button variant="outlined" color="primary" id="login-button" type="submit">
          login
        </Button>
      </form>
    </Togglable>
  );
};

export default LoginForm;
