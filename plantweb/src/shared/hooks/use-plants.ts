import { useCallback, useState } from "react";
import { useNetworkStatus } from "./use-network-status";
import {
  Plant,
} from "shared/types";
import {
  usePlantApi,
  PlantHealthAttributeSensorResponse,
  PlantPlantHealthAttributeResponse,
} from "api/plant-api";

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
    addPlant,
    editPlant,
    deletePlant,
    getPlantPlantHealthAttributes,
    getPlantPlantHealthAttribute,
    addPlantPlantHealthAttribute,
    editPlantPlantHealthAttribute,
    deletePlantPlantHealthAttribute,
  } = usePlantApi();

  const [plants, setPlants] = useState<Plant[]>([]);
  const [plant, setPlant] = useState<Plant>();
  const [plant_health_attributes, setPlantHealthAttributes] =
    useState<PlantPlantHealthAttributeResponse>();
  const [plant_health_attribute, setPlantHealthAttribute] =
    useState<PlantHealthAttributeSensorResponse>();

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

  const getAllPlantsPlantHealthAttributes = useCallback(async (id: number) => {
    setErrorMessage("");

    setInFlight();

    try {
      const response = await getPlantPlantHealthAttributes(id);

      setSuccess();
      setPlantHealthAttributes(response.data);
    } catch (e: any) {
      setNetworkStatusError();
      setErrorMessage(e);

      return;
    }
  }, []);

  const getPlantPlantHealthAttributeByID = useCallback(
    async (id: number, plant_health_attribute: number) => {
      setErrorMessage("");

      setInFlight();

      try {
        const response = await getPlantPlantHealthAttribute(
          id,
          plant_health_attribute
        );

        setSuccess();
        setPlantHealthAttribute(response.data);
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const addPlantHealthAtteributeCallback = useCallback(
    async (
      id: number,
      upper_required_value: number,
      lower_required_value: number,
      unit_measurement_id: number,
      plant_id: number,
      health_attribute_id: number
    ) => {
      setErrorMessage("");
      setInFlight();

      try {
        const response = await addPlantPlantHealthAttribute(id, {
          upper_required_value,
          lower_required_value,
          unit_measurement_id,
          plant_id,
          health_attribute_id,
        });

        setSuccess();

        return response.data;
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    [
      addPlantPlantHealthAttribute,
      setErrorMessage,
      setInFlight,
      setNetworkStatusError,
      setSuccess,
    ]
  );

  const editPlantHealthAtteributeCallback = useCallback(
    async (
      id: number,
      plant_health_attribute_id: number,
      upper_required_value: number,
      lower_required_value: number,
      unit_measurement_id: number,
      plant_id = id,
      health_attribute_id: number
    ) => {
      setErrorMessage("");
      setInFlight();

      try {
        const response = await editPlantPlantHealthAttribute(
          id,
          plant_health_attribute_id,
          {
            upper_required_value,
            lower_required_value,
            unit_measurement_id,
            plant_id,
            health_attribute_id,
          }
        );

        setSuccess();

        return response.data;
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    [
      editPlantPlantHealthAttribute,
      setErrorMessage,
      setInFlight,
      setNetworkStatusError,
      setSuccess,
    ]
  );

  const deletePlantPlantHealthAttributeByID = useCallback(
    async (plant_id: number, plant_health_attribute_id: number) => {
      setErrorMessage("");

      setInFlight();

      try {
        const response = await deletePlantPlantHealthAttribute(
          plant_id,
          plant_health_attribute_id
        );

        setSuccess();

        return response.data;
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    [
      deletePlantPlantHealthAttribute,
      setErrorMessage,
      setInFlight,
      setNetworkStatusError,
      setSuccess,
    ]
  );

  return {
    plants,
    plant,
    plant_health_attributes,
    plant_health_attribute,
    getPlants: getAllPlants,
    getPlant: getPlantByID,
    postPlant: addPlantCallback,
    editPlant: editPlantCallback,
    deletePlant: deletePlantByID,
    getPlantPlantHealthAttributes: getAllPlantsPlantHealthAttributes,
    getPlantHealthAttribute: getPlantPlantHealthAttributeByID,
    postPlantHealthAttribute: addPlantHealthAtteributeCallback,
    editPlantPlantHealthAttribute: editPlantHealthAtteributeCallback,
    deletePlantPlantHealthAttribute: deletePlantPlantHealthAttributeByID,
    networkStatus,
    errorMessage,
  } as const;
};
