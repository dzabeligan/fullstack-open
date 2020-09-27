import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { ALL_BOOKS, ALL_AUTHORS } from './queries';

const App = () => {
  const books = useQuery(ALL_BOOKS);
  const authors = useQuery(ALL_AUTHORS);
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);

  if (books.loading || authors.loading) {
    return <div>loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors authors={authors.data?.allAuthors} setError={notify} show={page === 'authors'} />

      <Books books={books.data?.allBooks} show={page === 'books'} />

      <NewBook show={page === 'add'} setError={notify} />
    </div>
  );
};

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>;
};

export default App;
