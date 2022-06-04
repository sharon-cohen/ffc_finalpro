import React from "react";
import Modal from "../../core/modal/Modal";

const GuideDisplay = ({ guide, onClose }) => {
  const { food, description, timeBeforeTest, amount, timeType } = guide || {};
  return (
    <Modal isOpen={!!guide} onClose={onClose} title="Guide">
      <div className="card-body p-9">
        <div className="row mb-7">
          <label className="col-lg-4 fw-bold text-muted">Food</label>
          <div className="col-lg-8">
            <span className="fw-bolder fs-6 text-gray-800">{food}</span>
          </div>
        </div>
        <div className="row mb-7">
          <label className="col-lg-4 fw-bold text-muted">Amount</label>
          <div className="col-lg-8 fv-row">
            <span className="fw-bold text-gray-800 fs-6">{amount}</span>
          </div>
        </div>
        <div className="row mb-7">
          <label className="col-lg-4 fw-bold text-muted">Description</label>
          <div className="col-lg-8 fv-row">
            <span className="fw-bold text-gray-800 fs-6">{description}</span>
          </div>
        </div>
        <div className="row mb-7">
          <label className="col-lg-4 fw-bold text-muted">
            How long before test to eat
          </label>
          <div className="col-lg-8 fv-row">
            <span className="fw-bold text-gray-800 fs-6">
              {`${timeBeforeTest} - ${timeType === "0" ? "Minutes" : "Hours"}`}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GuideDisplay;
