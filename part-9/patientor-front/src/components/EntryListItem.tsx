import React from "react";
import { Entry } from "../types";
import { assertNever } from "../utils";
import DiagnosisList from "./DiagnosisList";
import EntryTypeIcon from "./EntryTypeIcon";
import HealthRatingBar from "./HealthRatingBar";


interface EntryProps {
  entry: Entry,
}

const entryDetails = (entry: Entry): JSX.Element => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthRatingBar
          rating={entry.healthCheckRating}
          showText={true} />;

    case "OccupationalHealthcare":
      const employer = <div>Employer: {entry.employerName}</div>;
      const sickleave = !entry.sickLeave ? <></>
        : <div>
            Sickleave: {entry.sickLeave.startDate}—{entry.sickLeave.endDate}
          </div>;

      return <>{employer}{sickleave}</>;

    case "Hospital":
      if (entry.discharge) {
        return <>Discharged {entry.discharge.date}: {entry.discharge.criteria}</>;
      }
      return <></>;

    default:
      return assertNever(entry);
  }
};

const EntryListItem = ({ entry }: EntryProps): JSX.Element => {
  return (
    <div key={entry.id}
         style={{marginTop: "1.0em", border: "1px solid lightgray", padding: "0.7em" }}>

      <div style={{fontSize: "100%", padding: "0 0.3em 0.3em 0"}}>
        <EntryTypeIcon type={entry.type} />
        <span style={{fontSize: "110%", fontWeight: "bold", margin: "0 2em 0 0.5em"}}>{entry.date}</span>
        <span style={{fontSize: "110%", fontWeight: "bold"}}>Specialist: {entry.specialist}</span>
      </div>

      <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />

      <div style={{marginTop: "0.5em"}}>{entry.description}</div>

      <div style={{marginTop: "0.5em"}}>
        {entryDetails(entry)}
      </div>
    </div>
  );
};

export default EntryListItem;
