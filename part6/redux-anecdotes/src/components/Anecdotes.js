import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { setNotification, clearNotification } from '../reducers/notificationReducer';

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

  let notification;
  const handleVote = ({ id, content }) => {
    dispatch(vote(id));
    window.clearTimeout(notification);
    dispatch(setNotification(`you voted '${content}'`));
    notification = window.setTimeout(dispatch, 5000, clearNotification());
  };

  return anecdotes.map((anecdote) => (
    <Anecdote key={anecdote.id} onClick={() => handleVote(anecdote)} anecdote={anecdote} />
  ));
};

export default Anecdotes;
