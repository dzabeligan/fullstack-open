import { assertNever } from '../helper';
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatientEntry, Gender, NewEntry, Diagnosis, HealthCheckRating } from '../types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (isNaN(healthCheckRating) || healthCheckRating !== 0  || healthCheckRating !== 1  || healthCheckRating !== 2  || healthCheckRating !== 3 ) {
    throw new Error(`Incorrect or missing health check rating: ${healthCheckRating}`);
  }

  return healthCheckRating;
};

const parseField = (field: any, label: string): string => {
  if (!field || !isString(field)) {
    throw new Error(`Incorrect or missing ${label}: ${field}`);
  }

  return field;
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
  if (!Array.isArray(diagnosisCodes)) {
    throw new Error(`Incorrect or missing diagnosis codes: ${diagnosisCodes}`);
  }
  diagnosisCodes.map((code: any) => parseField(code, 'code'));
  
  return diagnosisCodes;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }

  return name;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }

  return ssn;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }

  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }

  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }

  return gender;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    ssn: parseSsn(object.ssn),
    name: parseName(object.name),
    gender: parseGender(object.gender),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
  };
};

const toNewEntries = (object: any): NewEntry => {
  const baseEntry = {
    date: parseDate(object.date),
    specialist: parseField(object.specialist, 'specialist'),
    description: parseField(object.description, 'description'),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  };
  switch (object.type) {
    case 'Hospital':
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: {
          date: parseDate(object.dicharge.date),
          criteria: parseField(object.discharge.criteria, 'criteria'),
        },
      };
    case 'HealthCheckEntry':
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case 'OccupationalHealthCare':
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseField(object.employerName, 'employer name'),
        sickLeave: {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate),
        }
      };

    default:
      {...baseEntry};
  }
};

export default toNewPatientEntry;
