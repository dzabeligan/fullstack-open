import React from 'react';
import Anecdotes from './components/Anecdotes';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = () => (
  <div>
    <h2>Anecdotes</h2>
    <Notification />
    <Filter />
    <AnecdoteForm />
    <Anecdotes />
  </div>
);

export default App;
