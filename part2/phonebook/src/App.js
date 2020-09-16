import React, { useState, useEffect } from 'react';

import AddContactForm from './components/AddContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import phonebookService from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '', id: '' });
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState({});

  useEffect(() => {
    phonebookService.getAll().then((initialContacts) => setPersons(initialContacts));
  }, []);

  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()));

  const handleSearch = ({ target: { value } }) => setSearch(value);

  const handleChange = ({ target: { name, value } }) =>
    setNewPerson((prevPerson) => ({ ...prevPerson, [name]: value }));

  const handleError = (notification) => {
    setNotification(notification);
    setTimeout(() => setNotification({}), 5000);
  };

  const handleDelete = (id) => setPersons(persons.filter((person) => person.id !== id));

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
          setNotification({ message: `Updated number for ${newPerson.name}` });
          setTimeout(() => setNotification({}), 5000);
        })
        .catch((error) => {
          setNotification({
            message: `Information of ${newPerson.name} has already been removed from server`,
            type: 'error',
          });
          setTimeout(() => setNotification({}), 5000);
          setPersons(persons.filter((person) => person.id !== id));
        });
      setNewPerson({ name: '', number: '', id: '' });
      return;
    }
    phonebookService.createContact({ ...newPerson, id: persons.length + 1 }).then((newContact) => {
      setPersons((prevPersons) => [...prevPersons, newContact]);
      setNotification({ message: `Added ${newPerson.name}` });
      setTimeout(() => setNotification({}), 5000);
      setNewPerson({ name: '', number: '', id: '' });
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={notification?.type} message={notification.message} />
      <Filter value={search} onChange={handleSearch} />
      <h2>Add a new contact</h2>
      <AddContactForm onSubmit={addName} newPerson={newPerson} onChange={handleChange} />
      <h2>Numbers</h2>
      <ContactList filteredPersons={filteredPersons} onError={handleError} onDelete={handleDelete} />
    </div>
  );
};

export default App;
