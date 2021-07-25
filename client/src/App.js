import React, { Fragment } from "react";
import "./App.css";
import "./index.css";
//components
import People from "./components/People";
import Tags from "./components/Tags";
import Relationship from "./components/Relationship";
import FindRelation from "./components/FindRelation";

function App() {
  return (
    <Fragment>
      <div className="center">
        <h1 className="text-center mt-5 text">Relationship Builder</h1>
        <People />
        <Tags />
        <Relationship />
        <FindRelation />
      </div>
    </Fragment>
  );
}

export default App;
