import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';

const Anecdote = ({ anecdote }) => {
  const { content, votes } = anecdote;
  const dispatch = useDispatch();

  return (
    <>
      <div>{content}</div>
      <div>has {votes} votes</div>
      <button onClick={() => dispatch(vote(anecdote))}>vote</button>
    </>
  );
};

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state).sort((a, b) => b.votes - a.votes);

  return anecdotes.map((anecdote) => <Anecdote key={anecdote.id} anecdote={anecdote} />);
};

export default Anecdotes;
