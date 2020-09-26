import { Link } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogStyle = {
    marginBottom: 5,
    marginTop: 25,
  };

  return blogs
    .sort((a, b) => b.likes - a.likes)
    .map((blog) => (
      <div key={blog.id} style={blogStyle}>
        <Link component={RouterLink} to={`/blogs/${blog.id}`}>
          {blog.title} <em>{blog.author}</em>
        </Link>
      </div>
    ));
};

export default Blogs;
