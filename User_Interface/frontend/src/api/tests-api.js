import { app } from "./app-instance";
import { socket } from "../components/app/AppLayout/Header/components/Notifications";

export const getAllDoctorTests = async () => {
  const response = await app.get("api/test/all");
  return response.data;
};

export const createTest = async (testForm) => {
  await app.post("api/test", testForm);
};

export const getPatientTests = async (patientId) => {
  const response = await app.get(`api/test/${patientId}`);
  return response.data;
};

export const deleteTest = async (testId, patientId) => {
  await app.delete(`api/test/${testId}`);
  socket.emit("test:delete", patientId);
  return true;
};

export const updateTest = async (testId, updatedTest) => {
  await app.post(`api/test/${testId}`, updatedTest);
  return true;
};

export const updateTestStatus = async (testId) => {
  await app.post(`api/test/status/${testId}`);
  return true;
};
