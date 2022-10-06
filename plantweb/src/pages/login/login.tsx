/* istanbul ignore file */
import React, { memo } from "react";
import { TextField, Button, Link } from "@mui/material";
import { useLoginLogic } from "./use-login-logic";
import PropTypes from "prop-types";

export const Login = memo(() => {
  // async function loginUser(credentials) {
  //   return fetch('http://localhost:3000/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(credentials)
  //   })
  //     .then(data => data.json())
  //  }

  const { username, password, onUsernameChange, onPasswordChange, onSubmit } =
    useLoginLogic();

  function LoginButton() {
    if (username && password) {
      return (
        <Button id="login-submit" variant="text" onClick={onSubmit}>
          Login
        </Button>
      );
    } else {
      return (
        <Button id="login-submit" variant="text" disabled>
          Login
        </Button>
      );
    }
  }
  // function Login({ setToken }) {
  //     Login.propTypes = {
  //       setToken: PropTypes.func.isRequired,
  //     };
  //   }
  return (
    <div>
      <div>Login</div>
      <div>
        <TextField
          id="login-username"
          label="User Name"
          variant="outlined"
          value={username}
          onChange={onUsernameChange}
        />
      </div>
      <div>
        <TextField
          id="login-password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={onPasswordChange}
        />
      </div>
      <div>
        <LoginButton />
      </div>
      <div>
        <Link href="#" underline="hover">
          {"Forgotten Password"}
        </Link>
      </div>
      <div>
        New to the app?
        <Link href="/signup" underline="hover">
          {" Sign Up "}
        </Link>
      </div>
    </div>
  );
});
