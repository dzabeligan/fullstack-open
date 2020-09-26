import userService from '../services/users';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_CREATORS':
      return action.data;
    default:
      return state;
  }
};

export const initializeCreators = () => {
  return async (dispatch) => {
    const creators = await userService.getAll();
    dispatch({
      type: 'INIT_CREATORS',
      data: creators,
    });
  };
};

export default reducer;
