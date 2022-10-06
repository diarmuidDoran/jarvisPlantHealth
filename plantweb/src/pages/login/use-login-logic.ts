import { ChangeEvent, useCallback, useState } from "react";
import { useUserAccounts } from "shared/hooks/use-user-accounts";
import { useHistory } from "react-router-dom";
import { PATHS } from "shared/constants";

export const useLoginLogic = () => {
  const { userAccounts, getUserAccounts } = useUserAccounts();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const onGetUsersData = useCallback(() => {
    getUserAccounts();
  }, [getUserAccounts]);

  const onUsernameChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setUsername(value);
    },
    [setUsername]
  );

  const onPasswordChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setPassword(value);
    },
    [setPassword]
  );

  const onLoginClick = useCallback(() => {
    history.push(`${PATHS.plants}`);
  }, [history]);

  const onSubmit = useCallback(() => {
    alert(username + " " + password);
    const userValidCheck = userAccounts.find(
      (userAccount) =>
        (userAccount.user_name === username &&
          userAccount.password === password) ||
        (userAccount.email === username && userAccount.password === password)
    );
    if (!userValidCheck) {
      alert("Wrong password or username");
    } else {
      onLoginClick();
    }
  }, [username, password]);

  return {
    username,
    password,
    onGetUsersData,
    onUsernameChange,
    onPasswordChange,
    onSubmit,
  };
};
