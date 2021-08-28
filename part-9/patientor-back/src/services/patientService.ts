import {v1 as uuid} from "uuid";

import patientData from "../../data/patients.json";
import { Patient, NewPatient, PatientNonSensitive } from "../types";


const patients: Patient[] = patientData;


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
