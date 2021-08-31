import React from "react";
import { Icon } from "semantic-ui-react";

import { assertNever } from "../utils";
import { Gender } from "../types";


interface GenderIconProps {
  gender: Gender,
}

const GenderIcon = ({gender}: GenderIconProps): JSX.Element => {
  switch (gender) {
    case Gender.Male:   return <Icon color="blue" name="mars" />;
    case Gender.Female: return <Icon color="pink" name="venus" />;
    case Gender.Other:  return <Icon color="black" name="genderless" />;
    default:            return assertNever(gender);
  }
};

export default GenderIcon;
