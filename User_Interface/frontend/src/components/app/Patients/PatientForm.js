import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../core/form/input/Input";
import Select from "../../core/form/select/Select";
import classNames from "classnames";
import { createPatient } from "../../../api/patients-api";
import { useMutation, useQueryClient } from "react-query";
import DatePicker from "../../core/form/date-picker/DatePicker";

const PatientForm = ({ setIsPatientModalOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { handleSubmit, ...methods } = useForm();
  const { mutate } = useMutation(createPatient, {
    onSuccess: () => {
      queryClient.invalidateQueries(["patients"]);
    },
  });
  const onCreate = async (registerForm) => {
    setIsLoading(true);
    try {
      await mutate(registerForm);
      setIsPatientModalOpen(false);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onCreate)}>
      <FormProvider {...methods}>
        <Input
          name="fullName"
          label="Full Name"
          type="text"
          rules={{
            required: "Full Name is required",
          }}
        />
        <Input
          name="email"
          label="Email"
          type="email"
          rules={{
            required: "Email is required",
          }}
        />
        <div className='m'>
        <label className="form-label mb-3">Date of birth</label>
        <DatePicker name='dateOfBirth'  />

        </div>
        <Select
          name="gender"
          label="Gender"
          rules={{ required: "Gender is required" }}
          options={[
            { value: "female", label: "Female" },
            { value: "male", label: "Male" },
          ]}
        />
        <Input
          name="id"
          label="ID"
          type="text"
          rules={{
            required: "ID is required",
          }}
        />
        <Input
          name="phoneNumber"
          label="Phone"
          type="text"
          rules={{
            required: "Phone is required",
          }}
        />
        <Input
          name="height"
          label="Height"
          type="text"
          rules={{
            required: "Height is required",
          }}
        />
        <Input
          name="weight"
          label="Weight"
          type="text"
          rules={{
            required: "Weight is required",
          }}
        />
        <Input
          name="allergies"
          label="Allergies"
          type="text"
          rules={{
            required: "Allergies is required",
          }}
        /> 
        <Select 
        rules={{required: "ISADHD is required"}}
        options={[{value: true, label: "Does have ADHD"}, { value: false, label: "Does not have ADHD"}]}
         name='isADHD'
         />
        <Input
          name="additionalInformation"
          label="Additional Information"
          type="text"
          rules={{
            required: "Additional Information is required",
          }}
        />
        <Input
          name="summary"
          label="Summary"
          type="text"
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

export default PatientForm;
