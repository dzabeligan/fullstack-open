const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.data.filter;
    default:
      return state;
  }
};

export const filterAnecdotes = (filter) => {
  return {
    type: 'FILTER',
    data: { filter },
  };
};

export default filterReducer;
