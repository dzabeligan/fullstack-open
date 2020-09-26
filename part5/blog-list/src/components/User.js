import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

const User = () => {
  const users = useSelector((state) => state.users);
  const match = useRouteMatch('/users/:id');
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  return user ? (
    <>
      <h2>{user.name}</h2>
      <div>
        <strong>added blogs</strong>
      </div>
      {user.blogs.length > 0 && (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      )}
    </>
  ) : null;
};

export default User;
