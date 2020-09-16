import React from 'react';

import phonebookService from '../services/phonebook';

const ContactList = ({ filteredPersons, onError, onDelete }) => {
  const handleClick = (event, { id, name }) => {
    if (!window.confirm(`Delete ${name} ?`)) return;
    phonebookService
      .deleteContact(id, name)
      .then((response) => onDelete(id))
      .catch((error) => {
        onDelete(id);
        onError({ message: `the contact '${name}' was already deleted from server`, type: 'error' });
      });
  };

  return filteredPersons.map((person) => (
    <p key={person.id}>
      {person.name} {person.number} <button onClick={(event) => handleClick(event, person)}>delete</button>
    </p>
  ));
};

export default ContactList;
