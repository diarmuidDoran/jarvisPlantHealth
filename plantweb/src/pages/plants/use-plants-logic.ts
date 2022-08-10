import { ChangeEvent, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { PATHS } from "shared/constants";

import { mockPlantData } from "shared/mocks";
import { usePlants } from 'shared/hooks/use-plants'

export const usePlantsLogic = () => {
  const [name, setName] = useState("");
  const [room_id, setRoomID] = useState("");

  const history = useHistory();
  const { plants, getPlants } = usePlants();

  const onNameChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      console.log(value);
      setName(value);
    },
    [setName]
  );

  const onRoomIDChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      console.log(value);
      setRoomID(value);
    },
    [setRoomID]
  );

  const onSubmit = useCallback(() => {
    alert(name + " " + room_id);
  }, [name, room_id]);

  const onPlantClick = useCallback(
    (id: string) => {
      history.push(`${PATHS.plants}/${id}`);
    },
    [history]
  );

  const onAddPlantClick = useCallback(() => {
    let path = "/add-plant";
    history.push(path);
  }, [history]);

  const sortPlantsDataByNameDesc = [...mockPlantData].sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  const onGetPlantsData = useCallback(() => {
    getPlants();
  }, [getPlants]);

  return {
    name,
    room_id,
    plants,
    onNameChange,
    onRoomIDChange,
    onSubmit,
    onGetPlantsData,
    onPlantClick,
    onAddPlantClick,
  };
};
