import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import Togglable from './Togglable';

import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useField } from '../hooks';
import { Button, TextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const BlogForm = () => {
  const dispatch = useDispatch();
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
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <Typography variant="subtitle1">create new</Typography>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <TextField label="title" variant="outlined" size="small" {...titleToPass} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <TextField label="author" variant="outlined" size="small" {...authorToPass} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <TextField label="url" variant="outlined" size="small" {...urlToPass} />
        </div>
        <div style={{ marginBottom: 10, marginTop: 5 }}>
          <Button variant="outlined" color="primary" type="submit">
            add blog
          </Button>
        </div>
      </form>
    </Togglable>
  );
};

export default BlogForm;
