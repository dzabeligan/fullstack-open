import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification);
  const color = type === 'error' ? 'red' : type === 'success' ? 'green' : 'yellow';
  const notificationStyle = {
    color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: color,
    padding: 10,
    marginBottom: 10,
  };

  return message ? (
    <div className="error" style={notificationStyle}>
      {message}
    </div>
  ) : null;
};

export default Notification;
