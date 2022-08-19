import { getNotifications, getNotification, addNotification, } from "./notification-api";
import { NotificationRequest } from "./notification-api-types";

export const useNotificationApi = () => {
  return {
    getNotifications: () => getNotifications({}),
    getNotification: (id: number) => getNotification(id, {}),
    addNotification: (notification: NotificationRequest) => addNotification(notification, {}),
  };
};
