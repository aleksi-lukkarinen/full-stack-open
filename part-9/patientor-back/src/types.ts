type UnionOmit<T, K extends string | number | symbol> =
  T extends unknown ? Omit<T, K> : never;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string,
}

export interface SickLeave {
  startDate: string,
  endDate: string,
}

export interface Discharge {
  date: string,
  criteria: string,
}

interface BaseEntry {
  id: string,
  date: string,
  type: string,
  specialist: string,
  description: string,
  diagnosisCodes?: Array<Diagnosis["code"]>,
}

export interface HealthCheckEntry
    extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry
    extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: SickLeave,
}

export interface HospitalEntry
    extends BaseEntry {
  type: "Hospital",
  discharge: Discharge,
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewEntry = UnionOmit<Entry, "id">;



export interface Patient {
  id: string,
  name: string,
  ssn: string,
  occupation: string,
  gender: Gender,
  dateOfBirth: string,
  entries: Entry[],
}

export type NewPatient = Omit<Patient, "id">;

export type PatientNonSensitive =
  Pick<Patient,
  "id" | "name" | "dateOfBirth" | "gender" | "occupation">;
