import React, { useState } from "react";
import PatientCard from "../../components/app/Patients/PatientCard";
import PatientsList from "../../components/app/Patients/PatientsList";
import PatientTestsAndTreatments from "../../components/app/Patients/PatientTestsAndTreatments";
import useAuth from "../../hooks/useAuth";

const Patients = (setIsPatientOpen) => {
  const { logout, isUserDoctor } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <div className="post d-flex flex-column-fluid" >
      <div className="d-flex flex-column flex-row-fluid align-items-center" >
        <div className="row g-6 g-xl-9 w-100" style={{
          display: 'flex',
          //alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div className="col-md-3 col-lg-3" style={{
            width: '30%'
          }} >
            <PatientsList
              selectedPatient={selectedPatient}
              setSelectedPatient={setSelectedPatient}
            />
          </div>
          {<div className="col-md-6 col-lg-3" style={{
            width: '50%'
          }} >
            <PatientCard selectedPatient={selectedPatient} />
          </div>}
          {/* <div className="col-md-12 col-lg-6">
            <PatientTestsAndTreatments selectedPatient={selectedPatient} />
          </div> */}
          {/* <>
            {isUserDoctor && (
              <>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setIsPatientOpen(true)}
                >
                  Create Patient
                </button>
              </>
            )}
          </> */}
        </div>
      </div>
    </div>
  );
};

export default Patients;
