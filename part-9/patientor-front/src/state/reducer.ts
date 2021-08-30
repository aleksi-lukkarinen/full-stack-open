import { State } from "./state";
import { Patient } from "../types";


export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    };


export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  };
};

export const addPatient = (patientToAdd: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patientToAdd,
  };
};

export const updatePatient = (patientToUpdate: Patient): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: patientToUpdate,
  };
};


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };

    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };

    case "UPDATE_PATIENT":
      const patients = state.patients;
      patients[action.payload.id] = action.payload;
      return {
        ...state,
        patients
      };

    default:
      return state;
  }
};
