export const mockUnitMeasurementData = [
    {
      id: 1,
      unit: "%",
    },
    {
      id: 2,
      unit: "°C",
    },
    {
      id: 3,
      name: "g.kg-1",
    },
  ];
  
  export const getUnitByID = (id: string) => {
    return mockUnitMeasurementData.find((unit) => unit.id.toString() === id);
  };