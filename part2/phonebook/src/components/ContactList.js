import React from 'react';

const ContactList = ({ filteredPersons }) =>
  filteredPersons.map((person) => (
    <p key={person.id}>
      {person.name} {person.number}
    </p>
  ));

export default ContactList;
