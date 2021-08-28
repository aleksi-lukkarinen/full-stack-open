import patientData from "../../data/patients.json";
import { Patient, PatientNonSensitive } from "../types";


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


export default {
  getPatients,
  getPatientsNonSensitive
};
