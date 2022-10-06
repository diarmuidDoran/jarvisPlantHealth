import { ChangeEvent, useCallback, useState } from "react";

export const useSignUpLogic = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailErrorMessage] = useState("");
  const [error, setError] = useState("");

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

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
      if (!isValidEmail(value) && value == "") {
        setError("Email is invalid");
        setEmailErrorMessage(error);
        setUserEmail(value);
      } else if (!isValidEmail(value)) {
        setError("Email is invalid");
        setEmailErrorMessage(error);
        setUserEmail(value);
      } else {
        setError("");
        setEmailErrorMessage(error);
        setUserEmail(value);
      }
    },
    [setUserEmail]
  );

  const handlePasswordChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setPassword(value);
    },
    [setPassword]
  );

  const handleConfirmPasswordChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(value);
    },
    [setConfirmPassword]
  );

  const onSubmit = useCallback(() => {
    alert(userName + " " + password);
  }, [userName, password]);

  return {
    first_name,
    last_name,
    userName,
    userEmail,
    password,
    confirmPassword,
    emailError,
    error,
    handleFirstNameChange,
    handleLastNameChange,
    handleUserNameChange,
    handleUserEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    onSubmit,
  };
};
