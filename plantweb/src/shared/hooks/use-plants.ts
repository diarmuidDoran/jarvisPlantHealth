import { useCallback, useState } from "react";
import { useNetworkStatus } from "./use-network-status";
// import { mockPlantData } from "shared/mocks/plants";
import {Plant} from "shared/types";
import { usePlantApi } from "api/plant-api";


export const usePlants = () => {
  const {
    status: networkStatus,
    setInFlight,
    setSuccess,
    setError: setNetworkStatusError,
  } = useNetworkStatus();

  const {
    getPlants,
    getPlant,
  } = usePlantApi(); 

  const [plants, setPlants] = useState<Plant[]>([]);
  const [plant, setPlant] = useState<Plant>();

  const [errorMessage, setErrorMessage] = useState("");

  const getAllPlants = useCallback(
    async () => {
      setErrorMessage("");

      setInFlight();

      try {
        const response = await getPlants();

        setSuccess();
        setPlants(response.data);
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const getPlantByID = useCallback(
    async (id:number) => {
      setErrorMessage("");

      setInFlight();

      try {
        const response = await getPlant(id);

        setSuccess();
        setPlant(response.data);
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
    plant,
    getPlants: getAllPlants,
    getPlant: getPlantByID,
    networkStatus,
    errorMessage,
  } as const;
};
