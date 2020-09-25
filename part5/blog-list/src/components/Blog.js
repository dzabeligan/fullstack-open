import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { setNotification } from '../reducers/notificationReducer';
import { removeBlog, like } from '../reducers/blogReducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [showExpanded, setShowExpanded] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLikes = async () => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 };
    dispatch(like(blogToUpdate));
  };

  const handleClick = async () => {
    if (!window.confirm(`Delete ${blog.title} ?`)) return;
    try {
      dispatch(removeBlog(blog.id));
      dispatch(setNotification({ message: `the blog '${blog.title}' deleted`, type: 'info' }));
    } catch (error) {
      dispatch(setNotification({ message: `the blog '${blog.title}' was already deleted from server`, type: 'error' }));
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setShowExpanded(!showExpanded)}>{showExpanded ? 'hide' : 'view'}</button>
      </div>
      {showExpanded && (
        <>
          <a href={blog.url}>{blog.url}</a>
          <div>
            likes {blog.likes} <button onClick={handleLikes}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          {user?.username === blog.user?.username && <button onClick={handleClick}>delete</button>}
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
