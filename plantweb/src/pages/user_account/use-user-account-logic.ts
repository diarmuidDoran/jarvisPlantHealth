// // import { SelectChangeEvent } from '@mui/material';
// import { ChangeEvent, useCallback, useState } from "react";
// import { useHistory } from "react-router-dom";
// import { useSensors } from "shared/hooks/use-sensors";
// import { PATHS } from "shared/constants";
// import { editUserAccount } from "api/user-account-api/user-account-api";
// import { useUserAccounts } from "shared/hooks/use-user-accounts";

// export const useUserAccountLogic = (id: number) => {
//     const {
//         getUserAccount,
//         editUserAccount,
//         deleteUserAccount,
//         getUserAccountPlants,
//       } = useUserAccounts();
//   const [name, setName] = useState("");
//   const [userName, setUserName] = useState("");
//   const [userEmail, setUserEmail] = useState("");

//   const { postSensor } = useSensors();

//   const history = useHistory();

//   const handleNameChange = useCallback(
//     ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
//       setName(value);
//     },
//     [setName]
//   );

//   const handleUserNameChange = useCallback(
//     ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
//       setUserName(value);
//     },
//     [setUserName]
//   );
//   const handleUserEmailChange = useCallback(
//     ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
//       setUserEmail(value);
//     },
//     [setUserEmail]
//   );
//   // const handleSensorCallFrequencyChange = (event: SelectChangeEvent) => {
//   //     setSensorCallFrequency(event.target.value as string)
//   // };

//   const onSubmit = useCallback(async () => {
//     const newSensor = await editUserAccount(
//         id,
//         userName,
//         name,
//         name,
//         userEmail,
//         password,
//     );
//     if (newSensor) {
//       history.push(`${PATHS.sensors}/${newSensor.id}`);
//     }
//   }, [
//     postSensor,
//     history,
//     sensorName,
//     sensorCallFrequency,
//     sensorConnectionPin,
//   ]);

//   return {
//     sensorName,
//     sensorCallFrequency,
//     sensorConnectionPin,
//     handleSensorNameChange,
//     handleSensorCallFrequencyChange,
//     handleSensorConnectionPinChange,
//     onSubmit,
//   };
// };
