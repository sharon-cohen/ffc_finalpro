import React from "react";
import { useQuery } from "react-query";
import { getPatients } from "../../../api/patients-api";
import { useNavigate, useSearchParams } from "react-router-dom";

const PatientsListHP = ({ selectedPatient, setSelectedPatient }) => {
  const { data, isLoading, isError } = useQuery("patients", getPatients);
  const navigate = useNavigate(); 

  return (
    <div
      className="card bg-dark text-white h-100"
      style={{ minHeight: "450px" }}
    >
      <div className="card-header">
        <h3 className="text-white card-title justify-content-center w-100">
        Patients in treatment
        </h3>
      </div>
      {isError && <span>Error</span>}
      {isLoading && <span>Loading</span>}
      {!isLoading && !isError && (
        <div style={{ textAlign:"center"}}>
          {data.map((p) => (
            <button
              key={p._id}
              className={`btn btn-outline-primary mx-5 my-3 ${
                selectedPatient?._id === p._id && "btn-dashed btn-success"
              }`}
              type="button"
              onClick={() => 
                
                //setSelectedPatient(p)
                navigate("/app/treatments" , {state: {p}})
                
              }
              
            >
              <div>
                <span >{p.fullName}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientsListHP;
