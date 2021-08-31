import React from "react";
import DiagnosisListItem from "./DiagnosisListItem";


interface DiagnosisListProps {
  diagnosisCodes: string[] | undefined,
}

const DiagnosisList = ({ diagnosisCodes }: DiagnosisListProps): JSX.Element => {
  let diagnoses = <div style={{fontStyle: "italic", color: "gray"}}>No diagnoses.</div>;
  if (Array.isArray(diagnosisCodes)) {
    diagnoses = (
      <div style={{marginTop: "0.3em"}}>
        <div>Diagnoses:</div>
        <ul className="diagnoseList" style={{paddingLeft: "1.5em", margin: "0.3em 0 0 0"}}>
          {diagnosisCodes.map(c =>
            <li key={c}><DiagnosisListItem code={c} /></li>)}
        </ul>
      </div>
    );
  }

  return diagnoses;
};

export default DiagnosisList;
