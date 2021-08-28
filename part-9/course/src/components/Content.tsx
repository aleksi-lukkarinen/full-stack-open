import React from "react";

import { CoursePart } from "../types";


interface ContentProps {
  courseParts: CoursePart[]
}

const Content = ({ courseParts }: ContentProps): JSX.Element => {
  return (
    <>
      {courseParts.map(p =>
        <p key={p.name}>{p.name} {p.exerciseCount}</p>
      )}
    </>
  );
}

export default Content;
