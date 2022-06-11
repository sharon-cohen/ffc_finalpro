import React from "react";
import BSModal from "react-bootstrap/Modal";

const Modal = ({ title, isOpen, onClose, children }) => {
  return (
    <>
      <BSModal
        onHide={onClose}
        show={isOpen}
        dialogClassName="modal-dialog modal-dialog-centered mw-900px"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2>{title}</h2>
            {onClose && (
              <div
                onClick={onClose}
                className="btn btn-sm btn-icon btn-active-color-primary"
                data-bs-dismiss="modal"
              >
                X
              </div>
            )}
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </BSModal>
    </>
  );
};

export default Modal;
