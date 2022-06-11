import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import classNames from "classnames";
import TextArea from "../../core/form/text-area/TextArea";
import { createNotification } from "../../../api/notifications";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "react-query";
import { getPatients } from "../../../api/patients-api";
import Select from "../../core/form/select/Select";

const CreateTicketForm = ({ onClose }) => {
  const { isUserDoctor } = useAuth();
  const { data } = useQuery("patients", getPatients, {
    enabled: isUserDoctor,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, ...methods } = useForm();
  const { createdBy = "" } = JSON.parse(localStorage.getItem("user"));
  const onComplete = async (ticketForm) => {
    setIsLoading(true);
    const { content, patient } = ticketForm;
    try {
      await createNotification({
        content,
        userSendType: isUserDoctor ? "patient" : "doctor",
        sendToUserID: isUserDoctor ? patient : createdBy,
      });
      onClose();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const patientOptions =
    data?.map((p) => ({
      value: p._id,
      label: p.fullName,
    })) || [];

  return (
    <form onSubmit={handleSubmit(onComplete)}>
      <FormProvider {...methods}>
        {isUserDoctor && (
          <Select
            options={patientOptions}
            name="patient"
            label="Select Patient"
          />
        )}
        <TextArea
          name="content"
          label="Content"
          rules={{
            required: "Content is required",
          }}
        />

        <div className="separator my-5" />
        <button
          className={classNames({
            "btn btn-primary w-100": true,
          })}
          type="submit"
        >
          {isLoading ? "Please Wait..." : "Create"}
          <span className="indicator-progress">
            {isLoading && (
              <span className="spinner-border spinner-border-sm align-middle ms-2" />
            )}
          </span>
        </button>
      </FormProvider>
    </form>
  );
};

export default CreateTicketForm;
