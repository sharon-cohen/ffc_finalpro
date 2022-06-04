import React, { useEffect, useState } from "react";
import PatientCard from "../../components/app/Patients/PatientCard";
import PatientsList from "../../components/app/Patients/PatientsList";
import Legend from "../../components/app/Patients/Legend";
import PatientTestsAndTreatments from "../../components/app/Patients/PatientTestsAndTreatments";
import { useLocation } from "react-router-dom";

const Treatments =() => {
  const location = useLocation();
  const [selectedPatient] = useState(location.state.p);

  return (
    <>
      <div className="post d-flex flex-column-fluid" >
        <div className="d-flex zflex-column flex-row-fluid align-items-center" >
          <div className="row g-6 g-xl-9 w-100" style={{
            //display: 'flex',
            //alignItems: 'center',
            justifyContent: 'center',
          }}>
            {<div className="col-md-12 col-lg-6" style={{
              width: '65%'
            }}>
              <PatientTestsAndTreatments selectedPatient={selectedPatient} />
            </div>}
          </div>
        </div>
      </div>
      <span> -</span>
      <div className="row g-6 g-xl-9 w-100" style={{
            //display: 'flex',
            //alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div className="col-md-3 col-lg-3" style={{
              width: '60%'
            }} >
              <Legend
              />
            </div>
            </div>
      </>

  );
};

export default Treatments;
