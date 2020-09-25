import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import { initializeBlogs } from './reducers/blogReducer';
import { clearUser, getUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div>
      <h2>{user === null ? 'log into application' : 'blogs'}</h2>
      <Notification />
      {user === null ? (
        <Togglable buttonLabel="log in">
          <LoginForm />
        </Togglable>
      ) : (
        <>
          <div>
            {user.name} logged in <button onClick={() => dispatch(clearUser())}>logout</button>
          </div>
          <BlogForm />
        </>
      )}

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default App;
