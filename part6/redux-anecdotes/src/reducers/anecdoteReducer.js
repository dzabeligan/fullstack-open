const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data;
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    case 'VOTE':
      return state.map((anecdote) =>
        anecdote.id !== action.id ? anecdote : { ...anecdote, votes: anecdote.votes + 1 },
      );
    default:
      return state;
  }
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  };
};

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data,
  };
};

export const vote = (id) => {
  return {
    type: 'VOTE',
    id,
  };
};

export default reducer;
