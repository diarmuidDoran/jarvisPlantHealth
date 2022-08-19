import { useCallback, useState } from "react";
import { useNetworkStatus } from "./use-network-status";
import { NotificationResponse, useNotificationApi } from "api/notification-api";

export const useNotifications = () => {
  const {
    status: networkStatus,
    setInFlight,
    setSuccess,
    setError: setNetworkStatusError,
  } = useNetworkStatus();

  const { getNotifications, getNotification, addNotification,} = useNotificationApi();

  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  const [notification, setNotification] = useState<NotificationResponse>();

  const [errorMessage, setErrorMessage] = useState("");

  const getAllNotifications = useCallback(async () => {
    setErrorMessage("");

    setInFlight();

    try {
      const response = await getNotifications();

      setSuccess();
      setNotifications(response.data);
    } catch (e: any) {
      setNetworkStatusError();
      setErrorMessage(e);

      return;
    }
  }, [
    getNotifications,
    setErrorMessage,
    setInFlight,
    setNetworkStatusError,
    setSuccess,
  ]);

  const getNotificationByID = useCallback(
    async (id: number) => {
      setErrorMessage("");

      setInFlight();

      try {
        const response = await getNotification(id);

        setSuccess();
        setNotification(response.data);
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    [getNotification, setErrorMessage, setInFlight, setNetworkStatusError, setSuccess]
  );

  const addNotificationCallback = useCallback(
    async (notification_details: string, time_stamp: string, plant_health_attribute_id: number) => {
      setErrorMessage("");
      setInFlight();

      try {
        const response = await addNotification({ notification_details, time_stamp, plant_health_attribute_id });

        setSuccess();

        return response.data;
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    [addNotification, setErrorMessage, setInFlight, setNetworkStatusError, setSuccess]
  );


  return {
    notifications,
    notification,
    getNotifications: getAllNotifications,
    getNotification: getNotificationByID,
    postNotification: addNotificationCallback,
    networkStatus,
    errorMessage,
  } as const;
};
