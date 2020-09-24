import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Anecdotes from './components/Anecdotes';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Filter from './components/Filter';

import { initializeAnecdotes } from './reducers/anecdoteReducer';
import anecdoteService from './services/anecdotes';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => dispatch(initializeAnecdotes(anecdotes)));
  }, [dispatch]);
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteForm />
      <Anecdotes />
    </div>
  );
};

export default App;
