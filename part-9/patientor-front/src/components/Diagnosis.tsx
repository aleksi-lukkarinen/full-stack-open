import React from "react";
//import { Diagnosis } from "../types";


interface PatientDiagnosisProps {
  code: string,
}

const PatientDiagnosis = ({ code }: PatientDiagnosisProps): JSX.Element => {
  return (
    <>
      <b>{code}</b>
    </>
  );
};

export default PatientDiagnosis;
