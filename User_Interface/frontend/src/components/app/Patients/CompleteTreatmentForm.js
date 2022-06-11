import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import classNames from "classnames";
import { completeTreatment } from "../../../api/treatment-api";
import TextArea from "../../core/form/text-area/TextArea";

const CompleteTreatment = ({ onClose, treatment }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, ...methods } = useForm();

  const onComplete = async (treatmentForm) => {
    setIsLoading(true);
    const { treatmentSummary } = treatmentForm;
    try {
      await completeTreatment(treatmentSummary, treatment);
      onClose(false);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onComplete)}>
      <FormProvider {...methods}>
        <TextArea
          name="treatmentSummary"
          label="Summary"
          rules={{
            required: "Summary is required",
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

export default CompleteTreatment;
