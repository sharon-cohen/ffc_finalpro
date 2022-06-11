import { app } from "./app-instance";

export const getNotifications = async () => {
  const response = await app.get("api/notifications");
  return response.data;
};

export const updateNotificationsStatus = async (notifications) => {
  const response = await app.post("api/notifications/status", {
    notifications,
  });
  return response.data;
};

// ticket
export const createNotification = async (notificationForm) => {
  console.log(notificationForm);
  const response = await app.post("api/notifications/ticket", notificationForm);
  return response.data;
};
