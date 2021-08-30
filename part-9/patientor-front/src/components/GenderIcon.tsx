import React from "react";
import { Icon } from "semantic-ui-react";

import { assertNever } from "../utils";
import { Gender } from "../types";


interface GenderIconProps {
  gender: Gender,
}

const GenderIcon = ({gender}: GenderIconProps) => {
  const IconGenderMale = () =>
    <Icon color="blue" name='mars' />;

  const IconGenderFemale = () =>
    <Icon color="pink" name='venus' />;

  const IconGenderOther = () =>
    <Icon color="black" name='genderless' />;


  let genderIcon: JSX.Element = <></>;

  switch (gender) {
    case Gender.Male:
      genderIcon = <IconGenderMale />;
      break;
    case Gender.Female:
      genderIcon = <IconGenderFemale />;
      break;
    case Gender.Other:
      genderIcon = <IconGenderOther />;
      break;
    default:
      assertNever(gender);
  }

  return genderIcon;
};

export default GenderIcon;
