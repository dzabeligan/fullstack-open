import React from 'react';

const Notification = ({ type, message }) => {
  const color = type === 'error' ? 'red' : 'green';
  const notification = {
    color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: color,
    padding: 10,
    marginBottom: 10,
  };

  return message ? <div style={notification}>{message}</div> : null;
};

export default Notification;
