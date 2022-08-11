import { ChangeEvent, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { PATHS } from "shared/constants";

import { usePlants } from 'shared/hooks/use-plants'

export const usePlantsLogic = () => {
  const [name, setName] = useState("");
  const [room_id, setRoomID] = useState("");

  const history = useHistory();

  const { plants, getPlants } = usePlants();

  const onNameChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setName(value);
    },
    [setName]
  );

  const onRoomIDChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
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

  //Sort plants in alphabetical order
  const sortPlantsDataByNameDesc = [...plants].sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  //get an array of the plants data via the api
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
