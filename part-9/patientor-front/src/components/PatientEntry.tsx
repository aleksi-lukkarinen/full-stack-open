import React from "react";
import { Entry } from "../types";
import Diagnosis from "./Diagnosis";


interface EntryProps {
  entry: Entry,
}

const PatientEntry = ({ entry }: EntryProps): JSX.Element => {
  return (
    <>
      <div key={entry.id} style={{marginTop: "0.2em"}}>
        <div><b>{entry.date}</b> — <em>{entry.description}</em></div>
        {!entry.diagnosisCodes
          ? ""
          : <ul className="diagnoseList" style={{marginTop: "0.5em"}}>
              {entry.diagnosisCodes.map(c =>
                <li key={c}><Diagnosis code={c} /></li>)}
            </ul>
        }
      </div>
    </>
  );
};

export default PatientEntry;
