import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { initializeBlogs } from './reducers/blogReducer';
import { getUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div>
      <h2>{user === null ? 'log into application' : 'blogs'}</h2>
      <Notification />
      {user === null ? <LoginForm /> : <BlogForm />}
      <Blogs />
    </div>
  );
};

export default App;
