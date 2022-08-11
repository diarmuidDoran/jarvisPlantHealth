import { useCallback, useState } from "react";

import { usePlants } from "shared/hooks/use-plants";

export const usePlantLogic = () => {
  const { plant, getPlant } = usePlants();

  const onGetPlantData = useCallback(
    (id: number) => {
      getPlant(id);
    },
    [getPlant]
  );

  return {
    plant,
    onGetPlantData,
  };
};
