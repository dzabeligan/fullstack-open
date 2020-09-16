import React, { useEffect, useState } from 'react';

import phonebookService from '../services/phonebook';

const ContactList = ({ filteredPersons }) => {
  const [persons, setPersons] = useState([]);

  useEffect(() => setPersons(filteredPersons), [filteredPersons]);

  const handleClick = (event, { id, name }) => {
    if (!window.confirm(`Delete ${name} ?`)) return;
    phonebookService
      .deleteContact(id, name)
      .then((response) => setPersons(persons.filter((person) => person.id !== id)))
      .catch((error) => {
        setPersons(persons.filter((person) => person.id !== id));
        alert(`the contact '${name}' was already deleted from server`);
      });
  };

  return persons.map((person) => (
    <p key={person.id}>
      {person.name} {person.number} <button onClick={(event) => handleClick(event, person)}>delete</button>
    </p>
  ));
};

export default ContactList;
