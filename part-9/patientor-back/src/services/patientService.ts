import {v1 as uuid} from "uuid";

import patientData from "../../data/patients";
import { Entry, Patient, NewPatient, PatientNonSensitive, NewEntry } from "../types";
import { toNewPatient, toNewEntry } from "../utils";


const patients: Patient[] = patientData.map(o => {
  const p = toNewPatient(o) as Patient;
  p.id = o.id;

  if (Array.isArray(o.entries)) {
    o.entries.map(e => {
      const entry = toNewEntry(e) as Entry;
      entry.id = e.id;
      return entry;
    });
  }

  p.entries = o.entries;
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

const addEntryForPatient = (patientId: string, e: NewEntry): Entry => {
  const patientSensitive = patients.find(p => p.id === patientId);
  if (patientSensitive === undefined) {
    throw new Error(`A patient with id "${patientId}" does not exist.`);
  }

  const entryId = uuid();
  const entryToAdd: Entry = {
    id: entryId,
    ...e,
  };

  patientSensitive.entries.push(entryToAdd);

  return entryToAdd;
};




export default {
  getPatientsSensitive,
  getPatientsNonSensitive,
  getPatientSensitive,
  addPatient,
  addEntryForPatient,
};
