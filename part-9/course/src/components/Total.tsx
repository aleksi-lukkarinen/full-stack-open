import React from "react";

import { CoursePart } from "../types";


interface TotalProps {
  courseParts: CoursePart[],
}

const Total = ({ courseParts  }: TotalProps): JSX.Element => {
  return (
    <p>
      Number of Regular Exercises:{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;
