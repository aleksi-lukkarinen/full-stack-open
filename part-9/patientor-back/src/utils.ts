import { Gender, NewPatient } from "./types";


type NewPatientFields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown
};

export const toNewPatient = (o: NewPatientFields): NewPatient => {
  const patient: NewPatient = {
    name: parseName(o.name),
    dateOfBirth: parseDateOfBirth(o.dateOfBirth),
    ssn: parseSSN(o.ssn),
    gender: parseGender(o.gender),
    occupation: parseOccupation(o.occupation)
  };

  return patient;
};



const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error(`Missing or malformatted name: "${name}"`);
  }

  return name.trim();
};



const MSG_ERR_DATE_OF_BIRTH =
    "Missing or malformatted date of birth";

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth)) {
    throw new Error(`${MSG_ERR_DATE_OF_BIRTH}: "${dateOfBirth}"`);
  }

  const s = dateOfBirth.trim();

  if (!isDate(s)) {
    throw new Error(`${MSG_ERR_DATE_OF_BIRTH}: "${dateOfBirth}"`);
  }

  return s;
};



const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error(
      `Missing or malformatted social security number: "${ssn}"`);
  }

  return ssn.trim();
};



const parseGender = (gender: unknown): Gender => {
  if (!isGender(gender)) {
    throw new Error(
      `Missing or malformatted gender: "${gender}"`);
  }

  return gender;
};



const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error(
      `Missing or malformatted occupation: "${occupation}"`);
  }

  return occupation.trim();
};



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (o: any): o is Gender => {
  return Object.values(Gender).includes(o);
};

const isString = (o: unknown): o is string => {
  return typeof(o) === "string" || o instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};



export default {
  toNewPatient
};
