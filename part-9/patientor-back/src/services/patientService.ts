import {v1 as uuid} from "uuid";

import patientData from "../../data/patients.json";
import { Patient, NewPatient, PatientNonSensitive } from "../types";
import { toNewPatient } from "../utils";


const patients: Patient[] = patientData.map(o => {
  const p = toNewPatient(o) as Patient;
  p.id = o.id;
  return p;
});


const getPatients = (): Patient[] => {
  return patients;
};

const getPatientsNonSensitive = (): PatientNonSensitive[] => {
  const nonSensitiveEntries =
    patients.map(({id, name, dateOfBirth, gender, occupation}) =>
      ({id, name, dateOfBirth, gender, occupation}));

  return nonSensitiveEntries;
};

const addPatient = (p: NewPatient): Patient => {
  const id = uuid();
  const patientToAdd: Patient = {id, ...p};

  patients.push(patientToAdd);

  return patientToAdd;
};


export default {
  getPatients,
  getPatientsNonSensitive,
  addPatient
};
