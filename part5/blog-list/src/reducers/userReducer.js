import loginService from '../services/login';
import blogService from '../services/blogs';

import { setNotification } from './notificationReducer';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    case 'CLEAR_USER':
      return null;
    default:
      return state;
  }
};

export const getUser = () => {
  const loggedInUser = window.localStorage.getItem('loggedInUser');
  const user = loggedInUser ? JSON.parse(loggedInUser) : null;
  user && blogService.setToken(user.token);
  return {
    type: 'SET_USER',
    data: user,
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch({
        type: 'SET_USER',
        data: user,
      });
    } catch {
      dispatch(setNotification({ message: 'Wrong credentials', type: 'error' }));
    }
  };
};

export const clearUser = () => {
  window.localStorage.removeItem('loggedInUser');
  return {
    type: 'CLEAR_USER',
  };
};

export default userReducer;
