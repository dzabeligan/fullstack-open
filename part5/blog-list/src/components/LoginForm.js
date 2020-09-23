import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })

  const handleChange = ({ target: { name, value } }) => {
    setCredentials((prevValue) => ({ ...prevValue, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await login(credentials)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username:
        <input
          type="text"
          value={credentials.username}
          name="username"
          onChange={handleChange}
          autoComplete="username"
        />
      </div>
      <div>
        password:
        <input
          type="password"
          value={credentials.password}
          name="password"
          onChange={handleChange}
          autoComplete="current-password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
}

export default LoginForm
