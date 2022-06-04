import React, { useEffect } from "react";
import { format } from "date-fns";
import { useQuery } from "react-query";
import TableIndicator from "../../../core/indicators/TableIndicator";
import {
  getNotifications,
  updateNotificationsStatus,
} from "../../../../api/notifications";
import useModal from "../../../../hooks/useModal";
import Modal from "../../../core/modal/Modal";
import CreateTicketForm from "../../Tickets/CreateTicketForm";

const Notifications = () => {
  const { isOpen, onClose, onOpen } = useModal();
  const { data, isLoading, isError } = useQuery(
    "notifications",
    getNotifications,
    {
      refetchOnWindowFocus: false,
      onSuccess: (d) => updateNotificationsStatus(d.map((t) => t._id)),
    }
  );
  return (
    <div className="card bg-dark h-100 text-white">
      <div className="card-body p-9">
        <div className="fs-1 fw-bold  mb-7 text-start d-flex justify-content-between ">
          <span className="d-inline-block position-relative ms-2">
            <span>Messages</span>
            <span className="d-inline-block position-absolute h-4px bottom-0 end-0 start-0 bg-success translate rounded" />
          </span>
          <button type="button" className="btn btn-primary" onClick={onOpen}>
            Create Message
          </button>
        </div>
        <div className="table-responsive">
          <TableIndicator isLoading={isLoading} />
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bolder text-white">
                <th className="min-w-200px">Content</th>
                <th className="min-w-150px">Date</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                !isError &&
                data.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-45px me-5" />
                        <div className="d-flex justify-content-start flex-column">
                          <span className="text-white fw-bolder text-hover-primary fs-6 d-flex align-items-center">
                            {p.status === "new" && (
                              <i className="bi bi-envelope-plus text-warning me-3 fs-2" />
                            )}
                            <div className="d-flex flex-column">
                              <span>{p.content}</span>
                              <span
                                className={`${
                                  p.sender === "system"
                                    ? "text-success"
                                    : "text-primary"
                                } fs-6 text-capitalize`}
                              >
                                By: {p.sender}
                              </span>
                            </div>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <a className="text-white fw-bolder text-hover-primary d-block fs-6">
                        {format(new Date(p.date), "MM/dd/yyyy")}
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} title="Create Ticket">
        <CreateTicketForm onClose={onClose} />
      </Modal>
    </div>
  );
};

export default Notifications;
