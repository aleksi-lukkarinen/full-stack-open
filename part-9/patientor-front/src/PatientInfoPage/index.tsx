import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "semantic-ui-react";

import axios from "axios";

import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient, addEntry } from "../state";
import { Entry, NewEntry, Patient } from "../types";

import GenderIcon from "../components/GenderIcon";
import EntryListItem from "../components/EntryListItem";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { assertNever } from "../utils";


const PatientInfoPage = () => {
  const { id: patientId } = useParams<{ id: string }>();

  const [ patientSensitive, setPatientSensitive ] =
    useState<Patient|undefined>(undefined);
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      console.log(values);

      const structureEntry = (values: EntryFormValues): NewEntry => {
        switch (values.type) {
          case "HealthCheck":
            return {
              type: values.type,
              date: values.date,
              specialist: values.specialist,
              description: values.description,
              diagnosisCodes: values.diagnosisCodes,
              healthCheckRating: values.healthCheckRating,
            };

          case "OccupationalHealthcare":
            return {
              type: values.type,
              date: values.date,
              specialist: values.specialist,
              description: values.description,
              diagnosisCodes: values.diagnosisCodes,
              employerName: values.employerName,
              sickLeave: !values.sickLeaveStartDate ? undefined : {
                startDate: values.sickLeaveStartDate,
                endDate: values.sickLeaveEndDate,
              },
            };

          case "Hospital":
            return {
              type: values.type,
              date: values.date,
              specialist: values.specialist,
              description: values.description,
              diagnosisCodes: values.diagnosisCodes,
              discharge: {
                date: values.dischargeDate,
                criteria: values.dischargeCriteria,
              },
            };

          default:
            return assertNever(values.type);
        }
      };

      const dataToSend = structureEntry(values);

      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        dataToSend
      );

      dispatch(addEntry(patientId, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

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

  const entries = Object.keys(patientSensitive.entries).length === 0
      ? <div style={{marginTop: "1.0em", fontStyle: "italic", color: "gray"}}>No entries.</div>
      : Object.values(patientSensitive.entries).map(e => <EntryListItem key={e.id} entry={e} />);

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add a New Entry</Button>

      {entries}
    </>
  );
};

export default PatientInfoPage;
