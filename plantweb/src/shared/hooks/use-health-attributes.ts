import { useCallback, useState } from "react";
import { useNetworkStatus } from "./use-network-status";
import {
  HealthAttributeResponse,
  useHealthAttributeApi,
} from "api/health-attribute-api";
import { getHealthAttributes } from "api/health-attribute-api/health-attribute-api";

export const useHealthAttributes = () => {
  const {
    status: networkStatus,
    setInFlight,
    setSuccess,
    setError: setNetworkStatusError,
  } = useNetworkStatus();

  const { getHealthAttributes } = useHealthAttributeApi();

  const [health_attributes, setHealthAttributes] = useState<
    HealthAttributeResponse[]
  >([]);

  const [errorMessage, setErrorMessage] = useState("");

  const getAllHealthAttributes = useCallback(async () => {
    setErrorMessage("");

    setInFlight();

    try {
      const response = await getHealthAttributes();

      setSuccess();
      setHealthAttributes(response.data);
    } catch (e: any) {
      setNetworkStatusError();
      setErrorMessage(e);

      return;
    }
  }, [
    getHealthAttributes,
    setErrorMessage,
    setInFlight,
    setNetworkStatusError,
    setSuccess,
  ]);

  return {
    health_attributes,
    getHealthAttributes: getAllHealthAttributes,
    networkStatus,
    errorMessage,
  } as const;
};
