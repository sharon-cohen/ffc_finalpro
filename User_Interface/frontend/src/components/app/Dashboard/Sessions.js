import React from "react";

const Sessions = () => {
  return (
    <div className="card bg-dark text-white h-100">
      <div className="card-body p-9">
        <div className="fs-1 fw-bold  mb-7 text-center">Your Next Session:</div>
        <div className="d-flex flex-wrap">
          <div
            className="d-flex flex-center me-9 mb-5"
            style={{ minHeight: "100px" }}
          >
            <div>Omer Cohen</div>
          </div>
        </div>
        <div className="card-footer">
          <button className="btn btn-primary w-100">Start Session</button>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
