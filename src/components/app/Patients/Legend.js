import React from "react";
import { useQuery } from "react-query";
import { getPatients } from "../../../api/patients-api";

const Legend = () => {


  return (
    <div
      className="card bg-dark text-white h-100"

    >
      <div className="card-header">
        <h3 className="text-white card-title justify-content-center w-100">
          Treatment statuses
        </h3>
        <ul>
          <li><b>New -</b> The treatment file is opened, waiting for the first tests to be added by the therapist</li>
          <li><b>In progress -</b> The tests defined in the treatment file are performed by the patient</li>
          <li><b>Hold -</b> Treatment is hold by the thearpist for some reason </li>
          <li><b>Completed -</b> The therapist decided to end the treatment process </li>
        </ul>
      </div>
      <div className="card-header">
        <h3 className="text-white card-title justify-content-center w-100">
          Test statuses
        </h3>
        <ul>
          <li><b>New -</b>The therapist entered a new test and the patient was required to confirm </li>
          <li><b>Planned -</b>A future test approved by the patient</li>
          <li><b>Problem -</b>The test was <b>NOT</b> performed correctly and there are <b>NO</b> results for some reason </li>
          <li><b>Done -</b>The test was performed correctly and there are results </li>
        </ul>
      </div>
    </div>
  );
};

export default Legend;
