import React from "react";

import { CoursePart } from "../types";
import Part from "./Part";


interface ContentProps {
  courseParts: CoursePart[],
}

const Content = ({ courseParts }: ContentProps): JSX.Element => {
  return (
    <>
      {courseParts.map(p =>
        <Part key={p.name} coursePart={p} />
      )}
    </>
  );
};

export default Content;
