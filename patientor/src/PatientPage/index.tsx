import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import { useHistory, useParams } from 'react-router-dom';

import PatientIcon from './PatientIcon';
import EntryDetails from './EntryDetails';

import { useStateValue } from '../state';

const PatientPage: React.FC = () => {
  const [{ patients }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const patient = patients[id];

  return (
    <div className="App">
      <Button onClick={() => history.push('/')}>Home</Button>
      <Container textAlign="center">
        <h3>{patient.name}</h3>
        <PatientIcon gender={patient.gender} />
      </Container>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <div>date of birth: {patient.dateOfBirth}</div>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default PatientPage;
