import React, { useContext } from "react";
import { ModalContext } from "../pages/app/AppRoutes";

const useGlobalModal = () => {
  const {
    isTestModalOpen,
    isPatientModalOpen,
    setIsTestModalOpen,
    setIsPatientModalOpen,
    onEditTest,
  } = useContext(ModalContext);
  return {
    isTestModalOpen,
    isPatientModalOpen,
    setIsTestModalOpen,
    setIsPatientModalOpen,
    onEditTest,
  };
};

export default useGlobalModal;
