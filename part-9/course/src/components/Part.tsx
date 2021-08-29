import React from "react";

import { CoursePart } from "../types";
import { assertNever } from "../utils";


interface PartProps {
  coursePart: CoursePart,
}

const Part = ({ coursePart }: PartProps): JSX.Element => {
  let description: JSX.Element = <></>;
  let data: JSX.Element = <></>;

  switch (coursePart.type) {
    case "normal":
      description = <div><em>{coursePart.description}</em></div>;
      break;

    case "groupProject":
      data = (
        <div>Project Exercises: {coursePart.groupProjectCount}</div>
      );
      break;

    case "special":
      data = (
        <div>Required Skills: {coursePart.requirements.join(", ")}</div>
      );
      break;

    case "submission":
      description = <div><em>{coursePart.description}</em></div>;
      data = (
        <div>Submit to <a href={coursePart.exerciseSubmissionLink}>{coursePart.exerciseSubmissionLink}</a></div>
      );
      break;

    default:
      return assertNever(coursePart);
  }

  return (
    <div className="coursePart" style={{marginBottom: "0.5em"}}>
      <div><b>{coursePart.name}</b></div>
      {description}
      <div>Regular Exercises: {coursePart.exerciseCount}</div>
      {data}
    </div>
  );
};

export default Part;
