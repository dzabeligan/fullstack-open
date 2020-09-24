import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote: { content, votes }, onClick }) => (
  <>
    <div>{content}</div>
    <div>
      has {votes} votes <button onClick={onClick}>vote</button>
    </div>
  </>
);

const Anecdotes = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())),
  ).sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10));
  };

  return anecdotes.map((anecdote) => (
    <Anecdote key={anecdote.id} onClick={() => handleVote(anecdote)} anecdote={anecdote} />
  ));
};

export default Anecdotes;
