import React from "react";

import { courseName, courseParts } from "./data/course";

import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";


const App = () => {
  return (
    <div>
      <Header content={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  )
};

export default App;
