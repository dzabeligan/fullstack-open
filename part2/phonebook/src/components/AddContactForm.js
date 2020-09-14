import React from 'react';

const AddContactForm = ({ onSubmit, newPerson, onChange }) => (
  <form onSubmit={(event) => onSubmit(event, newPerson)}>
    <div>
      name: <input name="name" value={newPerson.name} onChange={onChange} />
    </div>
    <div>
      number: <input name="number" value={newPerson.number} onChange={onChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default AddContactForm;
