import { app } from "./app-instance";

export const toggleTreatmentStatus = async (treatment, status) => {
  const response = await app.post(`api/treatment/toggle-status`, {
    status,
    treatment,
  });
  return response.data;
};

export const completeTreatment = async (treatmentSummary, treatmentID) => {
  const formData = new FormData();
  const response = await app.post(
    `api/treatment/complete`,
    {
      treatmentSummary,
      treatmentID,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
