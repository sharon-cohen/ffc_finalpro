import React, { useState, useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import Input from "../../core/form/input/Input";
import Select from "../../core/form/select/Select";
import classNames from "classnames";
import { getPatients } from "../../../api/patients-api";
import { useQuery, useQueryClient } from "react-query";
import TextArea from "../../core/form/text-area/TextArea";
import DatePicker from "../../core/form/date-picker/DatePicker";
import { createTest, updateTest } from "../../../api/tests-api";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { socket } from "../AppLayout/Header/components/Notifications";

const successSwal = withReactContent(Swal);

const TestForm = ({ setIsTestModalOpen, testToEdit }) => {
  const queryClient = useQueryClient();
  const { data } = useQuery("patients", getPatients);
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, watch, control, reset, ...methods } = useForm({
    defaultValues: {
      patient: testToEdit?.patient || "",
      testName: testToEdit?.testName || "",
      date: parseInt(testToEdit?.date) || "",
      foodGuide: testToEdit?.foodGuide || [
        {
          food: "",
          amountType: "",
          amount: "",
          timeBeforeTest: 0,
          timeType: 0,
          description: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "foodGuide",
    control,
  });
  const selectedPatientID = watch("patient");
  const selectedPatient = selectedPatientID
    ? data?.filter((p) => p._id === selectedPatientID)[0]
    : {};
  const onSubmit = async (testForm) => {
    const socketPath = testToEdit ? "test:update" : "test:create";
    const patient = testToEdit ? testToEdit.patient : testForm.patient;
    setIsLoading(true);
    try {
      const endpoint = testToEdit
        ? () => updateTest(testToEdit._id, testForm)
        : createTest;
      await endpoint(testForm);
      await socket.emit(socketPath, patient);
      setIsTestModalOpen(false);
      queryClient.refetchQueries(
        ["patientTests", testForm?.patient || testToEdit._id],
        testForm?.patient || testToEdit._id
      );
      await successSwal.fire({
        timer: 2000,
        timerProgressBar: true,
        toast: true,
        title: "Success!",
        icon: "success",
        position: "top-right",
        showConfirmButton: false,
      });
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormProvider reset={reset} control={control} watch={watch} {...methods}>
        <h3 className="text text-danger d-flex align-items-center my-5">
          <i className="bi bi-exclamation-diamond fs-1 mx-5" />
          <span>This Patient has allergies - {selectedPatient?.allergies}</span>
        </h3>
        <div>
          {!testToEdit && (
            <Select
              options={patientOptions}
              name="patient"
              label="Select Patient"
              rules={{ required: "Patient is required" }}
            />
          )}
          <Input
            name="testName"
            label="Test Name"
            type="text"
            rules={{ required: "Test Name is required" }}
          />
          <div>
            <label className="form-label mb-3">Test Date</label>
            <DatePicker name="date" />
          </div>
        </div>
        <div className="row">
          {fields.map((f, i) => (
            <div key={f.id} className="col-6">
              <div className="p-5 border-bottom border-info my-5">
                <h3 className="d-flex justify-content-between w-100 ">
                  <span>{`Food Guide - ${i + 1}`}</span>
                  {i === 1 && (
                    <button
                      className="btn btn-link p-0"
                      type="button"
                      onClick={() => remove(1)}
                    >
                      Remove
                    </button>
                  )}
                </h3>
                <Input name={`foodGuide[${i}].food`} label="Food" />
                <Input
                  name={`foodGuide[${i}].amount`}
                  label="Amount (Gram)"
                  type="number"
                />
                <div className="d-flex align-items-center justify-content-between">
                  <Select
                    options={[
                      { value: 0, label: "Minutes" },
                      { value: 1, label: "Hours" },
                    ]}
                    label="Hours / Minutes"
                    name={`foodGuide[${i}].timeType`}
                  />
                  <Input
                    type="number"
                    name={`foodGuide[${i}].timeBeforeTest`}
                    label="Time Before Test"
                  />
                </div>
                <TextArea
                  label="Description"
                  name={`foodGuide[${i}].description`}
                  rules={{
                    message: "Description is required",
                  }}
                />
              </div>
            </div>
          ))}
          {fields.length < 2 && (
            <div className="col-6 d-flex justify-content-center align-items-center">
              <button
                className="btn btn-primary"
                onClick={() => {
                  append({
                    food: "",
                    amountType: "Luo",
                    amount: "",
                    timeBeforeTest: 0,
                    timeType: 0,
                    description: "",
                  });
                }}
              >
                Add Food Guide +
              </button>
            </div>
          )}
        </div>
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

export default TestForm;