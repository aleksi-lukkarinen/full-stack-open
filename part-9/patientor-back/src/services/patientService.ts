import {v1 as uuid} from "uuid";

import patientData from "../../data/patients.json";
import { Entry, Patient, NewPatient, PatientNonSensitive } from "../types";
import { toNewPatient } from "../utils";


const patients: Patient[] = patientData.map(o => {
  const p = toNewPatient(o) as Patient;
  p.id = o.id;
  return p;
});


const getPatientsSensitive = (): Patient[] => {
  return patients;
};

const getPatientsNonSensitive = (): PatientNonSensitive[] => {
  const nonSensitiveEntries =
    patients.map(({id, name, dateOfBirth, gender, occupation}) =>
      ({id, name, dateOfBirth, gender, occupation}));

  return nonSensitiveEntries;
};

const getPatientSensitive = (patientId: string): Patient => {
  const patientSensitive = patients.find(p => p.id === patientId);
  if (patientSensitive === undefined) {
    throw new Error(`A patient with id "${patientId}" does not exist.`);
  }

  return patientSensitive;
};

const addPatient = (p: NewPatient): Patient => {
  const id = uuid();
  const entries: Entry[] = [];
  const patientToAdd: Patient = {
    id,
    ...p,
    entries,
  };

  patients.push(patientToAdd);

  return patientToAdd;
};


export default {
  getPatientsSensitive,
  getPatientsNonSensitive,
  getPatientSensitive,
  addPatient,
};
