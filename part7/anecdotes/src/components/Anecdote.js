import React from 'react';

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>
      {anecdote.content} by {anecdote.author}
    </h2>
    <div>has {anecdote.votes}</div>
    <div>for more info see {anecdote.info}</div>
  </div>
);

export default Anecdote;
