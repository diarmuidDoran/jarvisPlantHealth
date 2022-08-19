import { useCallback, useState } from "react";
import { useNetworkStatus } from "./use-network-status";
import { UnitMeasurementResponse, useUnitMeasurementApi } from "api/unit-measurement-api";
import { getUnitMeasurements } from "api/unit-measurement-api/unit-measurement-api";

export const useUnitMeasurements = () => {
  const {
    status: networkStatus,
    setInFlight,
    setSuccess,
    setError: setNetworkStatusError,
  } = useNetworkStatus();

  const { getUnitMeasuremsnts } = useUnitMeasurementApi();

  const [units, setUnitMeasurement] = useState<UnitMeasurementResponse[]>([]);
  

  const [errorMessage, setErrorMessage] = useState("");

  const getAllUnitMeasurements = useCallback(async () => {
    setErrorMessage("");

    setInFlight();

    try {
      const response = await getUnitMeasuremsnts();

      setSuccess();
      setUnitMeasurement(response.data);
    } catch (e: any) {
      setNetworkStatusError();
      setErrorMessage(e);

      return;
    }
  }, [
    getUnitMeasurements,
    setErrorMessage,
    setInFlight,
    setNetworkStatusError,
    setSuccess,
  ]);


  return {
    units,
    getUnitMeasurements: getAllUnitMeasurements,
    networkStatus,
    errorMessage,
  } as const;
};
