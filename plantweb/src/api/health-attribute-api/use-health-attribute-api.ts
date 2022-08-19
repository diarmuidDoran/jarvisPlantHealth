import { getHealthAttributes } from "./health-attribute-api";

export const useHealthAttributeApi = () => {
  return {
    getHealthAttributes: () => getHealthAttributes({}),
  };
};
