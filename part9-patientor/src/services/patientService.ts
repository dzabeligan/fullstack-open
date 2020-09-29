import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types';

const getPatients = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: uuidv4() as string,
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getPatients, getNonSensitivePatients, addEntry };
