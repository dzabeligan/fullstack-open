import { Button } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return blogs
    .sort((a, b) => b.likes - a.likes)
    .map((blog) => (
      <div key={blog.id} style={blogStyle}>
        <Button component={Link} to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Button>
      </div>
    ));
};

export default Blogs;
