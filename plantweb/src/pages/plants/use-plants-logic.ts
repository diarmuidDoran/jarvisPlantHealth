import { ChangeEvent, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { PATHS } from "shared/constants";

export const usePlantsLogic = () => {
  const [name, setName] = useState("");
  const [room_id, setRoomID] = useState("");
  const [allPlantData, setPlantData] = useState<any>([]);

  const history = useHistory();

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

  const mockPlantData = [
    {
      id: 1,
      name: "Plant 1",
      room_id: 1,
    },
    {
      id: 2,
      name: "APlant 2",
      room_id: 1,
    },
    {
      id: 3,
      name: "APlant 3",
      room_id: 2,
    },
    {
      id: 4,
      name: "ZPlant 4",
      room_id: 2,
    },
  ];

  const sortPlantDataByNameDesc = [...mockPlantData].sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  const onGetPlantData = useCallback(() => {
    console.log(sortPlantDataByNameDesc);
    setPlantData(sortPlantDataByNameDesc);
  }, [setPlantData]);

  return {
    name,
    room_id,
    allPlantData,
    onNameChange,
    onRoomIDChange,
    onSubmit,
    onGetPlantData,
    onPlantClick,
    onAddPlantClick,
  };
};
