import { ChangeEvent, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { PATHS } from "shared/constants";

import { mockRoomData } from "shared/mocks";
import { useRooms } from "shared/hooks/use-rooms"

export const useRoomsLogic = () => {
  const [allRoomData, setRoomData] = useState<any>([]);
  const { rooms, getRooms } = useRooms();

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
    getRooms();
  }, [getRooms]);

  const onGetRoomDataOLD = useCallback(() => {
    setRoomData(sortRoomDataByNameDesc);
  }, [setRoomData]);

  return {
    rooms,
    allRoomData,
    onGetRoomDataOLD,
    onGetRoomData,
    onRoomClick,
    onAddRoomClick,
  };
};
