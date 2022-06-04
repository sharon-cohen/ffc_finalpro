import React from "react";

const PatientCard = ({ selectedPatient }) => {
  return (
    <div className="card bg-dark h-100">
      <div className="card-body text-white">
        <div className="d-flex flex-center flex-column py-5">
          <span className="fs-3 text-white text-hover-primary fw-bolder mb-3 text-capitalize">
            {selectedPatient?.fullname}
          </span>
        </div>

        <div className="d-flex flex-stack fs-4 py-3">
          {/* <div className="fw-bolder rotate collapsible">
            {selectedPatient ? "Details" : "Select A Patient"}{" "}
          </div> */}
        </div>
        {/* <div className="separator" /> */}
        <div id="kt_user_view_details" className="collapse show">
          <div className="pb-5 fs-6">
            <div className="fw-bolder mt-5">ID</div>
            <div className="text-white">{selectedPatient?.id}</div>
            <div className="fw-bolder mt-5">Email</div>
            <div className="text-white">
              <span className="text-hover-primary">
                {selectedPatient?.email}
              </span>
            </div>
            <div className="fw-bolder mt-5">ALLERGIES</div>
            <div className="text-white">{selectedPatient?.allergies}</div>
            <div className="fw-bolder mt-5">is ADHD?</div>
            <div className="text-white">{selectedPatient?.isADHD}</div>
            <div className="fw-bolder mt-5">HEIGHT</div>
            <div className="text-white">{selectedPatient?.height}</div>
            <div className="fw-bolder mt-5">WEIGHT</div>
            <div className="text-white">{selectedPatient?.weight}</div>
            <div className="fw-bolder mt-5">DATE OF BIRTH</div>
            <div className="text-white">{selectedPatient?.dateOfBirth}</div>
            <div className="fw-bolder mt-5">ADDITIONAL INFORMATION</div>
            <div className="text-white">{selectedPatient?.additionalInformation}</div>
            <div className="fw-bolder mt-5">FIRST SUMMARY</div>
            <div className="text-white">{selectedPatient?.summary}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
