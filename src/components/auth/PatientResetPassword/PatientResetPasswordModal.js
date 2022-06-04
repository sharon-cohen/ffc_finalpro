import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Modal from "../../core/modal/Modal";
import PatientResetPasswordForm from "./PatientResetPasswordForm";

const PatientResetPasswordModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { ...methods } = useForm();
  return (
    <Modal isOpen={isOpen}>
      <FormProvider {...methods}>
        <PatientResetPasswordForm setIsOpen={setIsOpen} />
      </FormProvider>
    </Modal>
  );
};

export default PatientResetPasswordModal;
