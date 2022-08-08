/* istanbul ignore file */
import React, { memo } from "react";
import { TextField, Button } from "@mui/material";
import { usePlantLogic } from "./use-plant-logic";

export const PlantByID = memo(() => {
  const {
    username,
    password,
    data,
    onUsernameChange,
    onPasswordChange,
    onSubmit,
    onGetData,
  } = usePlantLogic();
  return (
    <div>
      <div>Plant by ID</div>
      <div>
        <TextField
          id="plant-by-id-username"
          label="User Name"
          variant="outlined"
          value={username}
          onChange={onUsernameChange}
        />
      </div>
      <div>
        <TextField
          id="plant-by-id-password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={onPasswordChange}
        />
      </div>
      <div>
        <Button id="plant-by-id-submit" variant="text" onClick={onSubmit}>
          Login
        </Button>
      </div>
      <div>
        <Button id="plant-by-id-get-data" variant="text" onClick={onGetData}>
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