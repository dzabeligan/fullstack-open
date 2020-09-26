import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Nav from './components/Nav';
import Blog from './components/Blog';
import Blogs from './components/Blogs';
import User from './components/User';
import Users from './components/Users';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { initializeBlogs } from './reducers/blogReducer';
import { getUser } from './reducers/userReducer';
import { initializeCreators } from './reducers/usersReducer';

const App = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeCreators());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div>
      <Nav />
      <Typography variant="caption">
        {loggedInUser === null ? 'log into application' : `logged in as ${loggedInUser.name}`}
      </Typography>
      <Notification />
      {loggedInUser === null && <LoginForm />}
      <Switch>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          {loggedInUser !== null && <BlogForm />}
          <Blogs />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
