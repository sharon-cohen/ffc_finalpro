import React from "react";
import PatientTests from "./PatientTests";

const PatientTestsAndTreatments = ({ selectedPatient }) => {
  return (
    <div className="card bg-dark h-100">
      <PatientTests selectedPatient={selectedPatient} />
    </div>
  );
};

export default PatientTestsAndTreatments;
