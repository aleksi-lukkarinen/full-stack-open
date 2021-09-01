import { Gender, NewPatient, Entry, NewEntry, HealthCheckEntry, OccupationalHealthcareEntry, SickLeave, HospitalEntry, Discharge, } from "./types";


export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


type NewPatientFields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
  entries: unknown,
};

export const toNewPatient = (o: NewPatientFields): NewPatient => {
  const patient: NewPatient = {
    name: parseName(o.name),
    dateOfBirth: parseDateOfBirth(o.dateOfBirth),
    ssn: parseSSN(o.ssn),
    gender: parseGender(o.gender),
    occupation: parseOccupation(o.occupation),
    entries: [],
  };

  return patient;
};



type NewEntryFields = {
  type: unknown,
  date: unknown,
  specialist: unknown,
  description: unknown,
  diagnosisCodes?: unknown, //Array<Diagnosis['code']>
};

export const toNewEntry = (e: NewEntryFields): NewEntry => {
  const baseEntry = {
    type: e.type as Entry["type"],
    date: parseDate(e.date),
    specialist: parseSpecialist(e.specialist),
    description: parseDescription(e.description),
    diagnosisCodes: parseDiagnosisCodes(e.diagnosisCodes),
  };

  switch (baseEntry.type) {
    case "HealthCheck":
      const hcEntry = e as HealthCheckEntry;
      return {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating:
            parseHealthCheckRating(hcEntry.healthCheckRating),
      };

    case "Hospital":
      const hEntry = e as HospitalEntry;
      return {
        ...baseEntry,
        type: "Hospital",
        discharge: parseDischarge(hEntry.discharge),
      };

    case "OccupationalHealthcare":
      const ohEntry = e as OccupationalHealthcareEntry;
      return {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseEmployerName(ohEntry.employerName),
        sickLeave: parseSickLeave(ohEntry.sickLeave),
      };

    default:
      return assertNever(baseEntry.type);
  }
};



export const toId = (o: unknown): string => {
  return parseId(o);
};



interface SickLeaveFields {
  startDate: unknown,
  endDate: unknown,
}

const parseSickLeave = (sickleave: unknown): SickLeave|undefined => {
  if (!sickleave)
    return undefined;

  if (typeof(sickleave) !== "object") {
    throw new Error(`Invalid sickleave info: ${sickleave}`);
  }

  const s = sickleave as SickLeaveFields;

  const newSickLeaveInfo = {
    startDate: parseDateValue(s.startDate, "sick leave start date"),
    endDate: parseDateValue(s.endDate, "sick leave end date"),
  };

  return newSickLeaveInfo;
};



interface DischargeFields {
  date: unknown,
  criteria: unknown,
}

const parseDischarge = (discharge: unknown): Discharge => {
  if (typeof(discharge) !== "object") {
    throw new Error(`Missing or invalid discharge info: ${discharge}`);
  }

  const d = discharge as DischargeFields;

  const newDischargeInfo = {
    date: parseDischargeDate(d.date),
    criteria: parseDischargeCriteria(d.criteria),
  };

  return newDischargeInfo;
};



const parseId = (id: unknown): string => {
  return parseStringValue(id, "id");
};



const parseSpecialist = (specialist: unknown): string => {
  return parseStringValue(specialist, "specialist");
};



const parseDescription = (description: unknown): string => {
  return parseStringValue(description, "description");
};



const parseDischargeCriteria = (criteria: unknown): string => {
  return parseStringValue(criteria, "discharge criteria");
};



const parseName = (name: unknown): string => {
  return parseStringValue(name, "name");
};



const parseEmployerName = (name: unknown): string => {
  return parseStringValue(name, "employer name");
};



const parseSSN = (ssn: unknown): string => {
  return parseStringValue(ssn, "social security number");
};



const parseOccupation = (occupation: unknown): string => {
  return parseStringValue(occupation, "occupation");
};



const parseDate = (date: unknown): string => {
  return parseDateValue(date, "date");
};



const parseDischargeDate = (date: unknown): string => {
  return parseDateValue(date, "discharge date");
};



const parseDateOfBirth = (dateOfBirth: unknown): string => {
  return parseDateValue(dateOfBirth, "date of birth");
};



const parseHealthCheckRating = (rating: unknown): number => {
  if (!isInteger(rating)) {
    throw new Error(
      `Missing or malformatted health check rating: "${rating}"`);
  }

  return rating;
};



const parseGender = (gender: unknown): Gender => {
  if (!isGender(gender)) {
    throw new Error(
      `Missing or malformatted gender: "${gender}"`);
  }

  return gender;
};



const parseDateValue = (date: unknown, dateName: string): string => {
  const s = parseStringValue(date, dateName);
  if (!isDate(s)) {
    throw new Error(`Missing or malformatted ${dateName}: "${date}"`);
  }

  return s;
};



const parseStringValue = (s: unknown, valueName: string): string => {
  if (!isString(s)) {
    throw new Error(
      `Missing or malformatted ${valueName.trim()}: "${s}"`);
  }

  return s.trim();
};



const parseDiagnosisCodes = (codes: unknown): string[]|undefined => {
  if (!codes)
    return undefined;

  if (!isArray(codes)) {
    throw new Error(
      `Invalid diagnosis code list: "${codes}"`);
  }

  return codes.map(parseDiagnosisCode);
};



const parseDiagnosisCode = (code: unknown): string => {
  return parseStringValue(code, "diagnosis code");
};



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (object: any): object is Gender => {
  return Object.values(Gender).includes(object);
};

const isString = (o: unknown): o is string => {
  return typeof(o) === "string" || o instanceof String;
};

const isInteger = (o: unknown): o is number => {
  return Number.isInteger(o);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isArray = (a: unknown): a is Array<unknown> => {
  return Array.isArray(a);
};
