import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <tr>
    <td>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </td>
    <td> {user.blogs.length}</td>
  </tr>
);

User.propTypes = {
  user: PropTypes.object.isRequired,
};

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <>
      <h2>Users</h2>
      {users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
