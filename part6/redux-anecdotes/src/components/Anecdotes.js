import React from 'react';
import { connect } from 'react-redux';
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

const Anecdotes = ({ vote, setNotification, anecdotes }) => {
  const handleVote = (anecdote) => {
    vote(anecdote);
    setNotification(`you voted '${anecdote.content}'`, 10);
  };

  return anecdotes.map((anecdote) => (
    <Anecdote key={anecdote.id} onClick={() => handleVote(anecdote)} anecdote={anecdote} />
  ));
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
      .filter((anecdote) => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes),
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  vote,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(Anecdotes);
