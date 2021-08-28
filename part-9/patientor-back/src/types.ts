export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string
}

export type PatientNonSensitive =
  Pick<Patient,
  "id" | "name" | "dateOfBirth" | "gender" | "occupation">;

export interface Diagnose {
  code: string,
  name: string,
  latin?: string
}
