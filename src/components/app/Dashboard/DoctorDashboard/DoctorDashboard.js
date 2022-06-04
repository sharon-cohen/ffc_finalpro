import React from "react";
import Notifications from "../Dashboard-components/Notifications";
import PatientTests from "../../Patients/PatientTests";
import PatientsListHP from "../../Patients/PatientsListHP";

const DoctorDashboard = () => {
  return (
    <div className="post d-flex flex-column-fluid">
      <div className="d-flex flex-column flex-row-fluid align-items-center">
        <div className="container">
          <div className="row g-6 g-xl-9 w-100">
            {/* <div className="col-12">
              <PatientTests getAll />
            </div> */}
            <div className="col-12" style={{ float: "left", width:"30%"}}>
              <PatientsListHP />
            </div>
            <div className="col-12" style={{ float: "left", width:"70%"}}>
              <Notifications />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
