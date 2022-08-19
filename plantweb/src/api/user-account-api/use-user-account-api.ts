import { getUserAccounts, getUserAccount, addUserAccount, editUserAccount, deleteUserAccount, getUserAccountPlant} from "./user-account-api";
import { UserAccountRequest } from "./user-account-api-types";

export const useUserAccountApi = () => {
  return {
    getUserAccounts: () => getUserAccounts({}),
    getUserAccount: (id: number) => getUserAccount(id, {}),
    addUserAccount: (user_account: UserAccountRequest) => addUserAccount(user_account, {}),
    editUserAccount: (id: number, user_account: UserAccountRequest) => editUserAccount(id, user_account, {}),
    deleteUserAccount: (id: number) => deleteUserAccount(id, {}),
    getUserAccountPlants: (id: number) => getUserAccountPlant(id, {}),
  };
};
