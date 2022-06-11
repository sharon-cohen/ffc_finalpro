import React from "react";
import { useQuery } from "react-query";
import { getPatients } from "../../../api/patients-api";

const PatientsList = ({ selectedPatient, setSelectedPatient }) => {
  const { data, isLoading, isError } = useQuery("patients", getPatients);

  return (
    <div
      className="card bg-dark text-white h-100"
      style={{ minHeight: "450px" }}
    >
      <div className="card-header">
        <h3 className="text-white card-title justify-content-center w-100">
          Patients
        </h3>
      </div>
      {isError && <span>Error</span>}
      {isLoading && <span>Loading</span>}
      {!isLoading && !isError && (
        <div className="d-flex justify-content-around flex-column h-100 ">
          {data.map((p) => (
            <button
              key={p._id}
              className={`btn btn-outline-primary mx-5 my-3 ${
                selectedPatient?._id === p._id && "btn-dashed btn-success"
              }`}
              type="button"
              onClick={() => setSelectedPatient(p)}
            >
              <div className="d-flex justify-content-between align-items-start">
                <span>{p.fullName}</span>
                <span className="text-white">ID: {p.id}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientsList;
