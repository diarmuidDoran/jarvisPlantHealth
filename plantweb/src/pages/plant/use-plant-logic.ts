import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { PATHS } from "shared/constants";

import { usePlants } from "shared/hooks/use-plants";

export const usePlantLogic = () => {
  const { plant, getPlant, deletePlant } = usePlants();

  const history = useHistory();

  const onPlantsClick = useCallback(() => {
    history.push(`${PATHS.plants}`);
  }, [history]);

  const onEditPlantClick = useCallback(
    (id: string) => {
      history.push(`${PATHS.plants}/${id}/edit`);
    },
    [history]
  );

  const onDeletePlantClick = useCallback(
    (id: number) => {
      deletePlant(id);
    },
    [deletePlant]
  );

  const onPlantSensorClick = useCallback(
    (id: string) => {
      history.push(`${PATHS.sensors}/${id}`);
    },
    [history]
  );

  const onGetPlantData = useCallback(
    (id: number) => {
      getPlant(id);
    },
    [getPlant]
  );

  return {
    plant,
    onGetPlantData,
    onPlantsClick,
    onEditPlantClick,
    onDeletePlantClick,
    onPlantSensorClick,
  };
};
