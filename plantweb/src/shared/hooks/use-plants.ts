import { useCallback, useState } from "react";
import { useNetworkStatus } from "./use-network-status";
import { Plant } from "shared/types";
import { usePlantApi } from "api/plant-api";

export const usePlants = () => {
  const {
    status: networkStatus,
    setInFlight,
    setSuccess,
    setError: setNetworkStatusError,
  } = useNetworkStatus();

  const { getPlants, getPlant, addPlant, editPlant, deletePlant } =
    usePlantApi();

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
    async (id: number) => {
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

  const addPlantCallback = useCallback(
    async (name: string, room_id: number) => {
      setErrorMessage("");
      setInFlight();

      try {
        const response = await addPlant({ name, room_id });

        setSuccess();

        return response.data;
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    [addPlant, setErrorMessage, setInFlight, setNetworkStatusError, setSuccess]
  );

  const editPlantCallback = useCallback(
    async (id: number, name: string, room_id: number) => {
      setErrorMessage("");
      setInFlight();

      try {
        const response = await editPlant(id, { name, room_id });

        setSuccess();

        return response.data;
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    [editPlant, setErrorMessage, setInFlight, setNetworkStatusError, setSuccess]
  );

  const deletePlantByID = useCallback(
    async (id: number) => {
      setErrorMessage("");

      setInFlight();

      try {
        const response = await deletePlant(id);

        setSuccess();

        return response.data;
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    [
      deletePlant,
      setErrorMessage,
      setInFlight,
      setNetworkStatusError,
      setSuccess,
    ]
  );

  return {
    plants,
    plant,
    getPlants: getAllPlants,
    getPlant: getPlantByID,
    postPlant: addPlantCallback,
    editPlant: editPlantCallback,
    deletePlant: deletePlantByID,
    networkStatus,
    errorMessage,
  } as const;
};
