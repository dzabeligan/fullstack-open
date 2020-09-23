import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ type, message }) => {
  const color = type === 'error' ? 'red' : 'green'
  const notification = {
    color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: color,
    padding: 10,
    marginBottom: 10,
  }

  return message ? (
    <div className="error" style={notification}>
      {message}
    </div>
  ) : null
}

Notification.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
}

export default Notification
