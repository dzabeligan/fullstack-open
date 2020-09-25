import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import Togglable from './Togglable';

import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useField } from '../hooks';

const BlogForm = () => {
  const dispatch = useDispatch();
  const title = useField('text', 'title');
  const author = useField('text', 'author');
  const url = useField('text', 'url', 'url');
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
  );
};

export default BlogForm;
