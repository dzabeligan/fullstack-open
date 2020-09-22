import React from 'react';

const LoginForm = ({ onChange, onSubmit, credentials }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        username:
        <input type="text" value={credentials.username} name="username" onChange={onChange} autoComplete="username" />
      </div>
      <div>
        password:
        <input
          type="password"
          value={credentials.password}
          name="password"
          onChange={onChange}
          autoComplete="current-password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
