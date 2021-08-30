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

interface BaseEntry {
  id: string,
  date: string,
  type: string,
  specialist: string,
  description: string,
  diagnosisCodes?: Array<Diagnosis['code']>,
}

interface HealthCheckEntry
    extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry
    extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string,
  },
}

interface HospitalEntry
    extends BaseEntry {
  type: "Hospital",
  discharge: {
    date: string,
    criteria: string,
  }
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
