import React from 'react';
import Anecdotes from './components/Anecdotes';
import AnecdoteForm from './components/AnecdoteForm';

const App = () => (
  <div>
    <h2>Anecdotes</h2>
    <AnecdoteForm />
    <Anecdotes />
  </div>
);

export default App;
