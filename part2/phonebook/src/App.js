import React, { useState } from 'react';

import AddContactForm from './components/AddContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-123456' }]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [search, setSearch] = useState('');

  const handleSearch = ({ target: { value } }) => {
    setSearch(value);
  };

  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()));

  const handleChange = ({ target: { name, value } }) => {
    setNewPerson((prevPerson) => ({ ...prevPerson, [name]: value }));
  };

  const addName = (event, newPerson) => {
    event.preventDefault();
    if (persons.find((person) => person.name.toLowerCase() === newPerson.name.toLowerCase())) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }
    setPersons((prevPersons) => [...prevPersons, newPerson]);
    setNewPerson({ name: '', number: '' });
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
