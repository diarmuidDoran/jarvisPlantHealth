import { useCallback, useState } from "react";
import { useNetworkStatus } from "./use-network-status";
import {
  UserAccountResponse,
  UserAccountPlantsResponse,
  useUserAccountApi,
} from "api/user-account-api";

export const useUserAccounts = () => {
  const {
    status: networkStatus,
    setInFlight,
    setSuccess,
    setError: setNetworkStatusError,
  } = useNetworkStatus();

  const {
    getUserAccounts,
    getUserAccount,
    addUserAccount,
    editUserAccount,
    deleteUserAccount,
    getUserAccountPlants,
  } = useUserAccountApi();

  const [userAccounts, setUserAccounts] = useState<UserAccountResponse[]>([]);
  const [userAccount, setUserAccount] = useState<UserAccountResponse>();
  const [userAccountPlants, setUserAccountPlants] =
    useState<UserAccountPlantsResponse>();

  const [errorMessage, setErrorMessage] = useState("");

  const getAllUserAccounts = useCallback(async () => {
    setErrorMessage("");

    setInFlight();

    try {
      const response = await getUserAccounts();

      setSuccess();
      setUserAccounts(response.data);
    } catch (e: any) {
      setNetworkStatusError();
      setErrorMessage(e);

      return;
    }
  }, [
    getUserAccounts,
    setErrorMessage,
    setInFlight,
    setNetworkStatusError,
    setSuccess,
  ]);

  const getUserAccountByID = useCallback(
    async (id: number) => {
      setErrorMessage("");

      setInFlight();

      try {
        const response = await getUserAccount(id);

        setSuccess();
        setUserAccount(response.data);
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    [
      getUserAccount,
      setErrorMessage,
      setInFlight,
      setNetworkStatusError,
      setSuccess,
    ]
  );

  const addUserAccountCallback = useCallback(
    async (
      user_name: string,
      first_name: string,
      last_name: string,
      email: string,
      password: string
    ) => {
      setErrorMessage("");
      setInFlight();

      try {
        const response = await addUserAccount({
          user_name,
          first_name,
          last_name,
          email,
          password,
        });

        setSuccess();

        return response.data;
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    [
      addUserAccount,
      setErrorMessage,
      setInFlight,
      setNetworkStatusError,
      setSuccess,
    ]
  );

  const editUserAccountCallback = useCallback(
    async (
      id: number,
      user_name: string,
      first_name: string,
      last_name: string,
      email: string,
      password: string
    ) => {
      setErrorMessage("");
      setInFlight();

      try {
        const response = await editUserAccount(id, {
          user_name,
          first_name,
          last_name,
          email,
          password,
        });

        setSuccess();

        return response.data;
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    [
      editUserAccount,
      setErrorMessage,
      setInFlight,
      setNetworkStatusError,
      setSuccess,
    ]
  );

  const deleteUserAccountPlants = useCallback(
    async (id: number) => {
      setErrorMessage("");

      setInFlight();

      try {
        const response = await deleteUserAccount(id);

        setSuccess();

        return response.data;
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    [
      deleteUserAccount,
      setErrorMessage,
      setInFlight,
      setNetworkStatusError,
      setSuccess,
    ]
  );

  const getUserAccountPlantGroup = useCallback(
    async (id: number) => {
      setErrorMessage("");

      setInFlight();

      try {
        const response = await getUserAccountPlants(id);

        setSuccess();
        setUserAccountPlants(response.data);
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    [
      getUserAccountPlants,
      setErrorMessage,
      setInFlight,
      setNetworkStatusError,
      setSuccess,
    ]
  );

  return {
    userAccounts,
    userAccount,
    userAccountPlants,
    getUserAccounts: getAllUserAccounts,
    getUserAccount: getUserAccountByID,
    postUserAccount: addUserAccountCallback,
    editUserAccount: editUserAccountCallback,
    deleteUserAccount: deleteUserAccountPlants,
    getUserAccountPlants: getUserAccountPlantGroup,
    networkStatus,
    errorMessage,
  } as const;
};
