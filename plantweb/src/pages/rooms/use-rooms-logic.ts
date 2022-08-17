import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { PATHS } from "shared/constants";

import { useRooms } from "shared/hooks/use-rooms";

export const useRoomsLogic = () => {
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

  // const sortRoomDataByNameDesc = [...mockRoomData].sort((a, b) => {
  //   if (a.name > b.name) {
  //     return 1;
  //   }
  //   if (a.name < b.name) {
  //     return -1;
  //   }
  //   return 0;
  // });

  const onGetRoomData = useCallback(() => {
    getRooms();
  }, [getRooms]);

  return {
    rooms,
    onGetRoomData,
    onRoomClick,
    onAddRoomClick,
  };
};
