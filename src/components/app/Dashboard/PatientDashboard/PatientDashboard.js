import React from "react";
import Notifications from "../Dashboard-components/Notifications";
import PatientTests from "../../Patients/PatientTests";
import NextTestCard from "../../Patients/NextTestCard";
const PatientDashboard = () => {
  const { id } = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="post d-flex flex-column-fluid">
      <div className="d-flex flex-column flex-row-fluid align-items-center">
        <h3>Your Next Test Code:</h3>
        <div className="container">
          <div className="row g-6 g-xl-9 w-100">
            <div className="col-12">
              <div className="row g-6 g-xl-9 w-100 h-100">
                <div className=" col-lg-12 col-xl-12 h-100">
                  <NextTestCard />
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row g-6 g-xl-9 w-100">
                <div className=" col-lg-12 col-xl-12">
                  <PatientTests selectedPatient={{ _id: id }} />
                </div>
                <div className=" col-lg-12 col-xl-12">
                  <Notifications />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
