import React from "react";
import { useStateValue } from "../state";


interface DiagnosisListItemProps {
  code: string,
}

const DiagnosisListItem = ({ code }: DiagnosisListItemProps): JSX.Element => {
  const [{ diagnoses }] = useStateValue();
  const diagnosisCode = <span style={{fontWeight: "bold"}}>{ code }</span>;
  const diagnosis = diagnoses[code];

  if (!diagnosis) {
    return diagnosisCode;
  }

  const diagnosisName = diagnosis.name
    ? <span style={{marginLeft: "0.2em"}}>{diagnosis.name}</span>
    : <></>;
  const diagnosisLatin = diagnosis.latin
    ? <span style={{fontStyle: "italic", fontSize: "90%", color: "gray", display: "block"}}>{diagnosis.latin}</span>
    : <></>;

  return (
    <div className="diagnosis">
      {diagnosisCode} {diagnosisName}
      {diagnosisLatin}
    </div>
  );
};

export default DiagnosisListItem;
