import { useCallback, useState } from "react";
import { useNetworkStatus } from "./use-network-status";
import { mockPlantData } from "shared/mocks/plants";

export const usePlants = () => {
  const {
    status: networkStatus,
    setInFlight,
    setSuccess,
    setError: setNetworkStatusError,
  } = useNetworkStatus();
  const [plants, setPlants] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const getPlants = useCallback(
    async () => {
      setErrorMessage("");

      setInFlight();

      try {
        const response = await Promise.resolve(mockPlantData);

        setSuccess();
        setPlants(response);
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    plants,
    getPlants,
    networkStatus,
    errorMessage,
  } as const;
};
