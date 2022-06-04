import React from "react";
import PatientTestsHistory from "./PatientTestsHistory";

const PatientTestsAndTreatments = ({ selectedPatient }) => {
  return (
    <div className="card bg-dark h-100">
      <PatientTestsHistory selectedPatient={selectedPatient} />
    </div>
  );
};

export default PatientTestsAndTreatments;
