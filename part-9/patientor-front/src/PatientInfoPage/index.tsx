import React, { useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { Patient } from "../types";

import GenderIcon from "../components/GenderIcon";
import EntryListItem from "../components/EntryListItem";


const PatientInfoPage = () => {
  const [ patientSensitive, setPatientSensitive ] =
    useState<Patient|undefined>(undefined);
  const { id: patientId } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patient = patients[patientId];
        if (patient
          && patient.name && patient.gender
          && patient.ssn && patient.dateOfBirth
          && patient.occupation && patient.entries) {

          setPatientSensitive(patient);
        }
        else {
          const { data: patientSensitiveFromApi } =
            await axios.get<Patient>(`${apiBaseUrl}/patients/${patientId}`);
          dispatch(updatePatient(patientSensitiveFromApi));
          setPatientSensitive(patientSensitiveFromApi);
        }
      }
      catch (e) {
        console.error(e);
      }
    };

    void fetchPatient();
  }, [dispatch]);

  if (!patientSensitive) {
    return <div>Loading...</div>;
  }

  const entries = patientSensitive.entries.length === 0
      ? <div style={{marginTop: "1.0em", fontStyle: "italic", color: "gray"}}>No entries.</div>
      : patientSensitive.entries.map(e => <EntryListItem key={e.id} entry={e} />);

  return (
    <>
      <div>
        <h2 style={{display: "inline-block", marginRight: "0.5em"}}>{patientSensitive.name}</h2>
        <span style={{fontSize: "160%"}}>
          <GenderIcon gender={patientSensitive.gender} />
        </span>
      </div>
      <div><b>Date of Birth:</b> {patientSensitive.dateOfBirth}</div>
      <div><b>SSN:</b> {patientSensitive.ssn}</div>
      <div><b>Occupation:</b> {patientSensitive.occupation}</div>

      <div style={{marginTop: "2.0em"}}>
        <h3>Entries</h3>
      </div>
      {entries}
    </>
  );
};

export default PatientInfoPage;
