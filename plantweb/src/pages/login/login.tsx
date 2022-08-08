/* istanbul ignore file */
import React, { memo } from "react";
import { TextField, Button } from "@mui/material";
import { useLoginLogic } from "./use-login-logic";

export const Login = memo(() => {
  const {
    username,
    password,
    data,
    onUsernameChange,
    onPasswordChange,
    onSubmit,
    onGetData,
  } = useLoginLogic();
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
        <Button id="login-submit" variant="text" onClick={onSubmit}>
          Login
        </Button>
      </div>
      <div>
        <Button id="login-get-data" variant="text" onClick={onGetData}>
          Get Data
        </Button>
      </div>
      <div>
        {data.length > 0 && (
          <div>
            <div>Data</div>
            <div>
              {data.map((item: any, index: number) => (
                <div key={index}>
                  ID:{item.id} Name:{item.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
