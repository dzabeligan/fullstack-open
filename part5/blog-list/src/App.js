import React, { useState, useEffect } from 'react';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

import blogService from './services/blogs';
import loginService from './services/login';

const initialCredentialState = { username: '', password: '' };
const initialBlogState = { title: '', author: '', url: '' };

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [credentials, setCredentials] = useState(initialCredentialState);
  const [blog, setBlog] = useState(initialBlogState);
  const [notification, setNotification] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };

    getBlogs();
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(credentials);

      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setCredentials(initialCredentialState);
    } catch (error) {
      setNotification({ message: 'Wrong credentials', type: 'error' });
      setTimeout(() => {
        setNotification({});
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  const handleLoginInput = ({ target: { name, value } }) => {
    setCredentials((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const newBlog = async (event) => {
    event.preventDefault();
    try {
      const response = await blogService.createBlog(blog);
      setBlogs((prevBlogs) => [...prevBlogs, response]);
      setNotification({ message: `a new blog ${response.title} by ${response.author} added` });
      setTimeout(() => {
        setNotification({});
      }, 5000);
      setBlog(initialBlogState);
    } catch (error) {
      setNotification({ message: 'Unauthorized', type: 'error' });
      setTimeout(() => {
        setNotification({});
      }, 5000);
    }
  };

  const handleBlogChange = ({ target: { name, value } }) => {
    setBlog((prevValue) => ({ ...prevValue, [name]: value }));
  };

  return (
    <div>
      <h2>{user === null ? 'log into application' : 'blogs'}</h2>
      <Notification type={notification?.type} message={notification.message} />
      {user === null ? (
        <LoginForm onSubmit={handleLogin} onChange={handleLoginInput} credentials={credentials} />
      ) : (
        <>
          <div>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </div>
          <BlogForm onSubmit={newBlog} onChange={handleBlogChange} blog={blog} />
        </>
      )}

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
