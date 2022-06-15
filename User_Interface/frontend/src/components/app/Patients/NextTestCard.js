import React from "react";
import { useQuery } from "react-query";
import { deleteTest, getPatientTests } from "../../../api/tests-api";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { format } from "date-fns";

const StartTestSwal = withReactContent(Swal);

const NextTestCard = () => {
  const { id } = JSON.parse(localStorage.getItem("user"));
  const { data, isLoading, isError, refetch } = useQuery(
    ["patientTests", id],
    () => getPatientTests(id),
    {
      select: (d) => ({
        ...d,
        tests: d?.tests.sort((a, b) => {
          return parseInt(a.date) - parseInt(b.date);
        }),
      }),
    }
  );
  const { tests = [] } = data || {};
  const sortedTests = [...tests].filter((a) => {
    return a.status !== 'problem' && a.status !== 'done'
  });
  const latestTest = sortedTests[0];
  const { testName, code, foodGuide, date } = latestTest || {};
  const onStartTest = async (testId, patientId) => {
    const { isConfirmed } = await StartTestSwal.fire({
      title: <span>{`Test Confirm`} </span>,
      html: (
        <p>
          {`Your Test code is   `}
          <span className="badge badge-success fs-4"> {code}</span>
        </p>
      ),
      icon: "info",
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
  return (
    <div className="card bg-dark h-100 ">
      <div className="card-body text-white">
        <span className="d-inline-block position-relative ms-2 fs-2">
          <span>{`Your Next Test Details`}</span>
          <span className="d-inline-block position-absolute h-4px bottom-0 end-0 start-0 bg-success translate rounded" />
        </span>
        {!isLoading && (
          <>
            <div className="row mb-7 mt-7">
              <label className="col-lg-6 fw-bold text-white">Test Name:</label>
              <div className="col-lg-6">
                <span className="fw-bolder fs-6 text-white">{testName}</span>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-6 fw-bold text-white">Test Date:</label>
              <div className="col-lg-6">
                <span className="fw-bolder fs-6 text-white">
                  {format(new Date(parseInt(date)), "d-M-yyyy - a zHH :mm")}
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-start">
              {foodGuide.map(
                (
                  { food, amount, description, timeBeforeTest, timeType },
                  i
                ) => (
                  <div className="border-primary border mx-5 p-5 flex-grow-1">
                    <h3 className="text-white">{`Guide - ${i}`}</h3>
                    <div className="row mb-7">
                      <label className="col-lg-4 fw-bold">Food:</label>
                      <div className="col-lg-8">
                        <span className="fw-bolder fs-6">{food}</span>
                      </div>
                    </div>
                    <div className="row mb-7">
                      <label className="col-lg-4 fw-bold ">Amount:</label>
                      <div className="col-lg-8 fv-row">
                        <span className="fw-bold  fs-6">{amount}</span>
                      </div>
                    </div>
                    <div className="row mb-7">
                      <label className="col-lg-4 fw-bold ">Description:</label>
                      <div className="col-lg-8 fv-row">
                        <span className="fw-bold  fs-6">{description}</span>
                      </div>
                    </div>
                    <div className="row mb-7">
                      <label className="col-lg-4 fw-bold flex-grow-1 ">
                        How long before test to eat
                      </label>
                      <div className="col-lg-8 fv-row">
                        <span className="fw-bold  fs-6">
                          {`${timeBeforeTest} - ${
                            timeType === "0" ? "Minutes" : "Hours"
                          }`}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            <button
              className="btn btn-primary mt-5 float-end "
              onClick={onStartTest}
            >
              Start the test
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NextTestCard;
