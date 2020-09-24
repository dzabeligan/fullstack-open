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

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
    });

    setTimeout(dispatch, time * 1000, clearNotification());
  };
};

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

export default notificationReducer;
