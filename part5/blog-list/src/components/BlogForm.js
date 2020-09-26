import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Togglable from './Togglable';

import { clearUser } from '../reducers/userReducer';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useField } from '../hooks';

const BlogForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');
  const blogFormRef = useRef();

  const { reset: titleReset, ...titleToPass } = title;
  const { reset: authorReset, ...authorToPass } = author;
  const { reset: urlReset, ...urlToPass } = url;

  const reset = () => {
    return [title, author, url].forEach((field) => field['reset']());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const blog = {
        title: title.value,
        author: author.value,
        url: url.value,
      };
      dispatch(createBlog(blog));
      dispatch(setNotification({ message: `a new blog ${blog.title} by ${blog.author} added`, type: 'success' }));
      reset();
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      dispatch(setNotification({ message: 'Unauthorized', type: 'error' }));
    }
  };

  return (
    <>
      <div>
        {user.name} logged in <button onClick={() => dispatch(clearUser())}>logout</button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            title:
            <input {...titleToPass} />
          </div>
          <div>
            author:
            <input {...authorToPass} />
          </div>
          <div>
            url:
            <input {...urlToPass} />
          </div>
          <button type="submit">add blog</button>
        </form>
      </Togglable>
    </>
  );
};

export default BlogForm;
