import { app } from "./app-instance";

export const createPatient = async (patientForm) => {
  const response = await app.post("api/patient/create", {
    patientForm: { ...patientForm },
  });
  return response.data;
};

export const getPatients = async () => {
  const response = await app.get("api/patient/");
  return response.data.patients;
};
