import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AddContactForm from './components/AddContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '', id: '' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleSearch = ({ target: { value } }) => {
    setSearch(value);
  };

  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()));

  const handleChange = ({ target: { name, value } }) => {
    setNewPerson((prevPerson) => ({ ...prevPerson, [name]: value }));
  };

  const addName = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name.toLowerCase() === newPerson.name.toLowerCase())) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }
    setPersons((prevPersons) => [...prevPersons, { ...newPerson, id: persons.length + 1 }]);
    setNewPerson({ name: '', number: '', id: '' });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChange={handleSearch} />
      <h2>Add a new contact</h2>
      <AddContactForm onSubmit={addName} newPerson={newPerson} onChange={handleChange} />
      <h2>Numbers</h2>
      <ContactList filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
