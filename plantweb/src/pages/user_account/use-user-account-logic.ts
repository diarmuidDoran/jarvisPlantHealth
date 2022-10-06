// import { SelectChangeEvent } from '@mui/material';
import {
  ChangeEvent,
  useCallback,
  useState,
  useEffect,
  MouseEvent,
} from "react";
import { useHistory } from "react-router-dom";
import { PATHS } from "shared/constants";
import { editUserAccount } from "api/user-account-api/user-account-api";
import { useUserAccounts } from "shared/hooks/use-user-accounts";

export const useUserAccountLogic = (id: number) => {
  const {
    getUserAccount,
    editUserAccount,
    deleteUserAccount,
    getUserAccountPlants,
    userAccount,
    userAccountPlants,
  } = useUserAccounts();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popoverAnchorEl, setPopoverAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const history = useHistory();

  const handleDeletePopperClick = (event: MouseEvent<HTMLButtonElement>) => {
    setPopoverAnchorEl(popoverAnchorEl ? null : event.currentTarget);
  };

  const onGetUserData = useCallback(() => {
    getUserAccount(id);
    getUserAccountPlants(id);
  }, [id, getUserAccount, getUserAccountPlants]);

  useEffect(() => {
    setUserName(userAccount?.user_name || "");
    setFirstName(userAccount?.first_name || "");
    setLastName(userAccount?.last_name || "");
    setUserEmail(userAccount?.email || "");
  });

  const handleFirstNameChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setFirstName(value);
    },
    [setFirstName]
  );

  const handleLastNameChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setLastName(value);
    },
    [setLastName]
  );

  const handleUserNameChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setUserName(value);
    },
    [setUserName]
  );
  const handleUserEmailChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setUserEmail(value);
    },
    [setUserEmail]
  );
  const handlePasswordhange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setPassword(value);
    },
    [setPassword]
  );
  const onPlantClick = useCallback(
    (id: string) => {
      history.push(`${PATHS.plants}/${id}`);
    },
    [history]
  );

  const onDeleteUserClick = useCallback(
    (id: number) => {
      deleteUserAccount(id);
    },
    [deleteUserAccount]
  );

  const onSubmit = useCallback(async () => {
    const updateUser = await editUserAccount(
      id,
      userName,
      first_name,
      last_name,
      userEmail,
      password
    );
    if (updateUser) {
      history.push(`${PATHS.user_account}/${updateUser.id}`);
    }
  }, [
    editUserAccount,
    history,
    first_name,
    last_name,
    userName,
    userEmail,
    password,
  ]);

  return {
    userAccount,
    userAccountPlants,
    first_name,
    last_name,
    userName,
    userEmail,
    popoverAnchorEl,
    handleFirstNameChange,
    handleLastNameChange,
    handleUserNameChange,
    handleUserEmailChange,
    handlePasswordhange,
    handleDeletePopperClick,
    onGetUserData,
    onPlantClick,
    onDeleteUserClick,
    onSubmit,
  };
};
