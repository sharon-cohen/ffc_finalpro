import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  getPatientTests,
  deleteTest,
  updateTestStatus,
  getAllDoctorTests,
} from "../../../api/tests-api";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import useGlobalModal from "../../../hooks/useGlobaModal";
import useAuth from "../../../hooks/useAuth";
import { socket } from "../AppLayout/Header/components/Notifications";
import { useNavigate } from "react-router-dom";
import { toggleTreatmentStatus } from "../../../api/treatment-api";
import useModal from "../../../hooks/useModal";
import Modal from "../../core/modal/Modal";
import CompleteTreatmentForm from "./CompleteTreatmentForm";
import TableIndicator from "../../core/indicators/TableIndicator";
import { format } from "date-fns";
import GuideDisplay from "./GuideDisplay";

const DeleteTestSwal = withReactContent(Swal);

const PatientTests = ({ selectedPatient, getAll = false }) => {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const navigate = useNavigate();
  const { isUserDoctor } = useAuth();
  const { isOpen, onClose, onOpen } = useModal();
  const { onEditTest, isTestModalOpen } = useGlobalModal();
  const { _id = "" } = selectedPatient || {};
  const { data, isLoading, isError, refetch } = useQuery(
    getAll ? "allTests" : ["patientTests", _id],
    () => (getAll ? getAllDoctorTests() : getPatientTests(_id)),
    {
      enabled: !!selectedPatient || getAll,
    }
  );

  const { tests = [], treatment = {} } = data || {};

  const onDeleteTest = async (testId, patientId) => {
    const { isConfirmed } = await DeleteTestSwal.fire({
      title: "Confirm Deletion",
      html: `This action is  <strong>FINAL</strong>
             and cannot be <span class="badge badge-danger">UNDONE</span>`,
      icon: "warning",
      buttonsStyling: false,
      showConfirmButton: true,
      showCancelButton: true,
      customClass: {
        confirmButton:
          "btn btn-outline btn-outline-dashed btn-outline-danger btn-active-light-danger",
        cancelButton:
          "btn btn-outline btn-outline-dashed btn-outline-dark btn-active-light-dark",
      },
    });
    if (isConfirmed) {
      await deleteTest(testId, patientId);
      await refetch();
    }
  };
  const onConfirmTest = async (testId) => {
    const { createdBy } = JSON.parse(localStorage.getItem("user"));
    await updateTestStatus(testId);
    socket.emit("test:confirm", createdBy);
    await refetch();
  };
  useEffect(() => {
    refetch();
  }, [isTestModalOpen]);
  return (
    <div className="card  bg-dark h-100 text-white">
      <div className="card-body p-9">
        <div className="fs-1 fw-bold  mb-7 d-flex justify-content-between">
          <h3 className="text-white">Tests</h3>
</div>            
        <div className="table-responsive">
          <TableIndicator isLoading={isLoading} />
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bolder text-white">
                <th className="min-w-100px">NAME</th>
                <th className="min-w-100px">DATE</th>
                <th className="min-w-135px">DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                !isError &&
                tests?.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-45px me-5" />
                        <div className="d-flex justify-content-start flex-column">
                          <span className="text-white fw-bolder text-hover-primary fs-6">
                            {p.testName}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <a className="text-white fw-bolder text-hover-primary d-block fs-6">
                        {p.date &&
                          format(parseInt(p.date), "d-M-yyyy - aHH:mm")}
                      </a>
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-start">
                        {p.foodGuide.map((e, i) => (
                          <button
                            onClick={() => setSelectedGuide(e)}
                            type="button"
                            key={i}
                            className="btn btn-outline btn-outline-dashed btn-outline-warning btn-active-light-warning me-2 btn-sm"
                          >{`Guide-${i + 1}`}</button>
                        ))}
                      </div>
                    </td>
                    <td className="text-end">
                      {isUserDoctor && (
                        <>
                          {p.status === "done" && (
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() =>
                                navigate("/app/results", {
                                  state: {
                                    ...p,
                                  },
                                })
                              }
                              type="button"
                            >
                              Results
                            </button>
                          )}

                        </>
                      )}
                      {!isUserDoctor && (
                        <>
                          {p.confirmationStatus === "response_required" && (
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => onConfirmTest(p._id)}
                              type="button"
                            >
                              Approve
                            </button>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {isUserDoctor && (
        <Modal isOpen={isOpen} title="Complete Treatment" onClose={onClose}>
          <CompleteTreatmentForm treatment={treatment?._id} onClose={onClose} />
        </Modal>
      )}
      <GuideDisplay
        guide={selectedGuide}
        onClose={() => setSelectedGuide(false)}
      />
    </div>
  );
};

export default PatientTests;
