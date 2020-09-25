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
export const setNotification = (message) => {
  return async (dispatch) => {
    if (notification) clearTimeout(notification);
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
    });

    notification = setTimeout(dispatch, 5000, clearNotification());
  };
};

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

export default notificationReducer;
