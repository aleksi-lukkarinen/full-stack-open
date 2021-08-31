import React from "react";
import { Icon } from "semantic-ui-react";

import { assertNever } from "../utils";
import { Entry } from "../types";


interface EntryTypeIconProps {
  type: Entry["type"],
}

const EntryTypeIcon = ({type}: EntryTypeIconProps): JSX.Element => {
  const IconHealthCheck = () =>
    <Icon name="calendar alternate outline" style={{color: "#0088ff"}} />;

  const IconOccupationalHealthcare = () =>
    <Icon name="stethoscope" style={{color: "#ff0099"}} />;

  const IconHospital = () =>
    <Icon name="ambulance" style={{color: "#006600"}} />;


  switch (type) {
    case "HealthCheck":
      return <IconHealthCheck />;

    case "OccupationalHealthcare":
      return <IconOccupationalHealthcare />;

    case "Hospital":
      return <IconHospital />;

    default:
      return assertNever(type);
  }
};

export default EntryTypeIcon;
