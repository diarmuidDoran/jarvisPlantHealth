/* istanbul ignore file */
import React, { memo } from "react";
import { TextField, Button, Link } from "@mui/material";
import { useSignUpLogic } from "./use-sign-up-logic";

export const SignUp = memo(() => {
  const {
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
  } = useSignUpLogic();

  function SubmitButton() {
    if (
      first_name &&
      last_name &&
      userEmail &&
      error == "" &&
      password &&
      confirmPassword == password
    ) {
      return (
        <Button id="login-submit" variant="text" onClick={onSubmit}>
          Sign-Up
        </Button>
      );
    } else {
      return (
        <Button id="login-submit" variant="text" disabled>
          Sign-Up
        </Button>
      );
    }
  }

  return (
    <div>
      <div>Sign Up</div>
      <div>
        <TextField
          id="login-username"
          label="User Name"
          variant="outlined"
          value={userName}
          onChange={handleUserNameChange}
        />
      </div>
      <div>
        <TextField
          id="user-firstname"
          label="First Name"
          variant="outlined"
          value={first_name}
          onChange={handleFirstNameChange}
        />
      </div>
      <div>
        <TextField
          id="user-lastname"
          label="Last Name"
          variant="outlined"
          value={last_name}
          onChange={handleLastNameChange}
        />
      </div>
      <div>
        <TextField
          id="user-email"
          label="Email"
          variant="outlined"
          value={userEmail}
          onChange={handleUserEmailChange}
        />
        <span
          style={{
            fontSize: 0.25,
            color: "red",
          }}
        >
          {emailError}
        </span>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div>
        <TextField
          id="login-password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <TextField
          id="confirm-login-password"
          label="Confirm Password"
          variant="outlined"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </div>
      <div>
        <SubmitButton />
      </div>
      <div>
        Already have an account?
        <Link href="/login" underline="hover">
          {" Login "}
        </Link>
      </div>
    </div>
  );
});
