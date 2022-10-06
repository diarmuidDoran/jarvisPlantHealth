/* istanbul ignore file */
import React, { memo, useEffect } from "react";
import {
  Button,
  TextField,
  Stack,
  Grid,
  List,
  ListItemText,
  ListItem,
  Divider,
  Link,
  Fab,
  Box,
  Popper,
} from "@mui/material";
import { useUserAccountLogic } from "./use-user-account-logic";
import { useAppStyles } from "use-app-styles";
import DeleteIcon from "@mui/icons-material/Delete";
export type UserByIDProps = { id: string };
export const UserAccountByID = memo(({ id }: UserByIDProps) => {
  const {
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
    handleDeletePopperClick,
    onGetUserData,
    onPlantClick,
    onDeleteUserClick,
    onSubmit,
  } = useUserAccountLogic(Number(id));

  const open = Boolean(popoverAnchorEl);
  const popOverID = open ? "simple-popper" : undefined;

  useEffect(
    () => {
      onGetUserData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { classes } = useAppStyles();

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      xs={12}
    >
      {userAccountPlants === undefined && <>No room for this id, go back. </>}
      {userAccountPlants && userAccount && (
        <>
          <Grid xs={9}>
            <h3 className={classes.page_title}>Your Information</h3>
          </Grid>
          <Grid xs={3} sm={2} md={1}>
            <Fab
              size="small"
              color="primary"
              aria-label={popOverID}
              onClick={handleDeletePopperClick}
            >
              <DeleteIcon />
            </Fab>
            <Popper id={popOverID} open={open} anchorEl={popoverAnchorEl}>
              <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
                <p>Are you sure you want to delete this Room?</p>
                <button
                  id="Sesnsor Name"
                  onClick={() => {
                    onDeleteUserClick(userAccount.id);
                    //function to return users to login page required TODO
                  }}
                >
                  Delete
                </button>
              </Box>
            </Popper>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            xs={12}
          >
            <Grid xs={12}></Grid>
            <Grid xs={12}>
              <TextField
                id="first_name"
                label="First Name"
                variant="outlined"
                value={first_name}
                style={{ width: "75%", marginBottom: 10 }}
                onChange={handleFirstNameChange}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                id="last_name"
                label="Last Name"
                variant="outlined"
                value={last_name}
                onChange={handleLastNameChange}
                style={{ width: "75%", marginBottom: 10 }}
              />
            </Grid>
            <Grid xs={12}></Grid>
            <Grid xs={12}>
              <TextField
                id="user_name"
                label="Username"
                variant="outlined"
                value={userName}
                onChange={handleUserNameChange}
                style={{ width: "75%", marginBottom: 10 }}
              />
            </Grid>
            <Grid xs={12}></Grid>
            <Grid xs={12}>
              <TextField
                id="user_email"
                label="User Email"
                variant="outlined"
                value={userEmail}
                onChange={handleUserEmailChange}
                style={{ width: "75%", marginBottom: 10 }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            xs={12}
            rowSpacing={1}
            row-gap={100}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid xs={12} style={{ width: "75%", marginTop: 10 }}>
              <h4>Your Plants</h4>
            </Grid>
            <Grid xs={12}>
              {userAccountPlants.plants.length > 0 ? (
                <>
                  <Grid xs={12}>
                    <List component="nav" aria-label="plant_folders">
                      {userAccountPlants?.plants.map(
                        (plant: any, index: number) => {
                          return (
                            <Divider key={index}>
                              <ListItem
                                button
                                onClick={() => onPlantClick(plant.id)}
                              >
                                <ListItemText primary={plant.name} />
                              </ListItem>
                            </Divider>
                          );
                        }
                      )}
                    </List>
                  </Grid>

                  <Grid
                    container
                    xs={12}
                    spacing={1}
                    direction="row"
                    justifyContent="flex-end"
                  >
                    <Grid xs={2}>
                      <Stack
                        spacing={2}
                        direction="row"
                        style={{
                          width: "75%",
                          marginBottom: 20,
                          marginTop: 20,
                        }}
                      >
                        <Button variant="outlined" onClick={onSubmit}>
                          Save Changes
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
});
