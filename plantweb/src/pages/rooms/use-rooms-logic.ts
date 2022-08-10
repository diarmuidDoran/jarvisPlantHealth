import { ChangeEvent, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { PATHS } from "shared/constants";

import { mockRoomData } from "shared/mocks";

export const useRoomsLogic = () => {
  const [allRoomData, setRoomData] = useState<any>([]);

  const history = useHistory();

  const onRoomClick = useCallback(
    (id: string) => {
      history.push(`${PATHS.rooms}/${id}`);
    },
    [history]
  );

  const onAddRoomClick = useCallback(() => {
    let path = "/add-room";
    history.push(path);
  }, [history]);

  const sortRoomDataByNameDesc = [...mockRoomData].sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  const onGetRoomData = useCallback(() => {
    console.log(sortRoomDataByNameDesc);
    setRoomData(sortRoomDataByNameDesc);
  }, [setRoomData]);

  return {
    allRoomData,
    onGetRoomData,
    onRoomClick,
    onAddRoomClick,
  };
};
