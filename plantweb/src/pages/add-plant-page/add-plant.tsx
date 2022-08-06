/* istanbul ignore file */
import React, { memo } from "react";
import { TextField, Button } from "@mui/material";
import { useAddPlantLogic } from "./use-add-plant-logic";

export const AddPlant = memo(() => {
  const {
    username,
    password,
    data,
    onUsernameChange,
    onPasswordChange,
    onSubmit,
    onGetData,
  } = useAddPlantLogic();
  return (
    <div>
      <div>Add Plant</div>
      <div>
        <TextField
          id="addPlant-username"
          label="User Name"
          variant="outlined"
          value={username}
          onChange={onUsernameChange}
        />
      </div>
      <div>
        <TextField
          id="addPlant-password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={onPasswordChange}
        />
      </div>
      <div>
        <Button id="addPlant-submit" variant="text" onClick={onSubmit}>
          Login
        </Button>
      </div>
      <div>
        <Button id="addPlant-get-data" variant="text" onClick={onGetData}>
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