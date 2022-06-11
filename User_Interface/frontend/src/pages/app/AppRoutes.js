import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../../components/app/AppLayout/Header/Header";
import Dashboard from "./Dashboard";
import Patients from "./Patients";
import Treatments from "./Treatments";
import treatmentsspecs from "./TreatmentsSpec";
import History from "./History";
import Modal from "../../components/core/modal/Modal";
import PatientForm from "../../components/app/Patients/PatientForm";
import TestForm from "../../components/app/Tests/TestForm";
import useAuth from "../../hooks/useAuth";
import PatientDashboard from "../../components/app/Dashboard/PatientDashboard/PatientDashboard";
import DoctorDashboard from "../../components/app/Dashboard/DoctorDashboard/DoctorDashboard";
import Results from "../../components/app/Results/Results";
import PatientResetPasswordModal from "../../components/auth/PatientResetPassword/PatientResetPasswordModal";
import TreatmentsSpec from "./TreatmentsSpec";

const bodyClass = "header-fixed header-tablet-and-mobile-fixed toolbar-fixed";

export const ModalContext = createContext({
  isPatientModalOpen: false,
  setIsPatientModalOpen: () => {},
  isTestModalOpen: false,
  setIsTestModalOpen: () => {},
});

const AppRoutes = () => {
  const { isUserDoctor } = useAuth();
  const { isPasswordSet } = JSON.parse(localStorage.getItem("user"));
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [testToEdit, setTestToEdit] = useState(null);

  const onEditTest = (test) => {
    setIsTestModalOpen(true);
    setTestToEdit(test);
  };

  useEffect(() => {
    const bodyClasses = bodyClass.split(" ");
    document.body.classList.add(...bodyClasses);
    return () => {
      document.body.classList.remove(...bodyClasses);
    };
  }, []);

  useEffect(() => {
    if (!isTestModalOpen) {
      setTestToEdit(null);
    }
  }, [isTestModalOpen]);
  return (
    <div className="wrapper d-flex flex-column flex-row-fluid">
      <Header
        setIsPatientOpen={setIsPatientModalOpen}
        setIsTestOpen={setIsTestModalOpen}
      />
      <div className="content d-flex flex-column flex-column-fluid">
        <div>
          <ModalContext.Provider
            value={{
              isTestModalOpen,
              isPatientModalOpen,
              setIsPatientModalOpen,
              setIsTestModalOpen,
              onEditTest,
            }}
          >
            <Routes>
              <Route
                path="/app/dashboard"
                element={
                  isUserDoctor ? <DoctorDashboard /> : <PatientDashboard />
                }
              />
              {isUserDoctor && (
                <>
                  <Route path="/app/patients" element={<Patients />} />
                  <Route path="/app/treatments" element={<Treatments />} />
                  <Route path="/app/treatmentsspecs" element={<TreatmentsSpec />} />
                  <Route path="/app/history" element={<History />} />
                  <Route path="/app/results" element={<Results />} />
                </>
              )}
            </Routes>
          </ModalContext.Provider>
        </div>
      </div>
      {isUserDoctor && (
        <>
          <Modal
            isOpen={isPatientModalOpen}
            onClose={() => setIsPatientModalOpen(false)}
            title="Create Patient"
          >
            <PatientForm setIsPatientModalOpen={setIsPatientModalOpen} />
          </Modal>
          <Modal
            isOpen={isTestModalOpen}
            onClose={() => setIsTestModalOpen(false)}
            title="Create Test"
          >
            <TestForm
              setIsTestModalOpen={setIsTestModalOpen}
              testToEdit={testToEdit}
            />
          </Modal>
        </>
      )}
      {!isUserDoctor && isPasswordSet && <PatientResetPasswordModal />}
    </div>
  );
};

export default AppRoutes;
