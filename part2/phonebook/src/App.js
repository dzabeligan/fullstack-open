import React, { useState, useEffect } from 'react';

import AddContactForm from './components/AddContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import phonebookService from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '', id: '' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    phonebookService.getAll().then((initialContacts) => setPersons(initialContacts));
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
      if (
        !window.confirm(
          `${newPerson.name} is already added to phonebook. Do you want to replace the old number with a new one?`,
        )
      )
        return;
      const id = persons.find((person) => person.name.toLowerCase() === newPerson.name.toLowerCase()).id;
      phonebookService
        .updateContact(id, newPerson)
        .then((updatedContact) => {
          setPersons(persons.map((person) => (person.id !== id ? person : updatedContact)));
          setNewPerson({ name: '', number: '', id: '' });
        })
        .catch((error) => {
          alert(`the contact '${newPerson.name}' was already deleted from server`);
          setPersons(persons.filter((person) => person.id !== id));
          setNewPerson({ name: '', number: '', id: '' });
        });
      return;
    }
    phonebookService
      .createContact({ ...newPerson, id: persons.length + 1 })
      .then((newContact) => setPersons((prevPersons) => [...prevPersons, newContact]));
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
