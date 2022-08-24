import { useCallback, useState, MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import { PATHS } from "shared/constants";

import { useRooms } from "shared/hooks/use-rooms";

export const useRoomLogic = () => {
  const { room, getRoom, deleteRoom } = useRooms();
  const [popoverAnchorEl, setPopoverAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const history = useHistory();

  const handleDeletePopperClick = (event: MouseEvent<HTMLButtonElement>) => {
    setPopoverAnchorEl(popoverAnchorEl ? null : event.currentTarget);
  };

  const onRoomsClick = useCallback(() => {
    history.push(`${PATHS.rooms}`);
  }, [history]);

  const onEditRoomClick = useCallback(
    (id: string) => {
      history.push(`${PATHS.rooms}/${id}/edit`);
    },
    [history]
  );

  const onDeleteRoomClick = useCallback(
    (id: number) => {
      deleteRoom(id);
    },
    [deleteRoom]
  );

  const onRoomPlantClick = useCallback(
    (id: string) => {
      history.push(`${PATHS.plants}/${id}`);
    },
    [history]
  );

  const onGetRoomData = useCallback(
    (id: number) => {
      getRoom(id);
    },
    [getRoom]
  );

  return {
    room,
    popoverAnchorEl,
    onGetRoomData,
    onDeleteRoomClick,
    onRoomPlantClick,
    onRoomsClick,
    onEditRoomClick,
    handleDeletePopperClick,
  };
};
