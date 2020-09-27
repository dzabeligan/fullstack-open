import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, EDIT_BIRTH_YEAR } from '../queries';

const Authors = ({ authors, show, setError }) => {
  const [born, setBorn] = useState('');
  const [name, setName] = useState('');

  const [editAuthor, result] = useMutation(EDIT_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });

  useEffect(() => {
    if (result.data && !result.data.editAuthor) {
      setError('name not found');
    }
  }, [result.data, setError]);

  if (!show) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    editAuthor({ variables: { name, born: +born } });
    setName('');
    setBorn('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birth year</h3>
      <form onSubmit={handleSubmit}>
        <select value={name} onChange={(e) => setName(e.target.value)}>
          <option hidden defaultValue value="">
            select author to update
          </option>
          {authors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <input value={born} onChange={(e) => setBorn(e.target.value)} />
        <button>update author</button>
      </form>
    </div>
  );
};

export default Authors;
