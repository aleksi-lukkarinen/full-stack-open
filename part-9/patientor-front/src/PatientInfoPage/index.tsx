import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "semantic-ui-react";

import axios from "axios";

import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";

import GenderIcon from "../components/GenderIcon";


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
          dispatch({ type: "UPDATE_PATIENT", payload: patientSensitiveFromApi });
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

  return (
    <>
      <div>
        <h2 style={{display: "inline-block", marginRight: "0.5em"}}>{patientSensitive.name}</h2>
        <span style={{fontSize: "160%"}}>
          <GenderIcon gender={patientSensitive.gender} />
        </span>
      </div>
      <Table celled>
        <Table.Body>
          <Table.Row>
            <Table.Cell><b>Date of Birth:</b></Table.Cell>
            <Table.Cell>{patientSensitive.dateOfBirth}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell><b>SSN:</b></Table.Cell>
            <Table.Cell>{patientSensitive.ssn}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell><b>Occupation:</b></Table.Cell>
            <Table.Cell>{patientSensitive.occupation}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
};

export default PatientInfoPage;
