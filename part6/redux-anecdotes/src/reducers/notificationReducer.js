const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message;
    case 'CLEAR_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

let notification;
export const setNotification = (message, time) => {
  return async (dispatch) => {
    if (notification) clearTimeout(notification);
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
    });

    notification = setTimeout(dispatch, time * 1000, clearNotification());
  };
};

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

export default notificationReducer;
