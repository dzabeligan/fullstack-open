import React from 'react';

const ContactList = ({ filteredPersons }) =>
  filteredPersons.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}
    </p>
  ));

export default ContactList;
