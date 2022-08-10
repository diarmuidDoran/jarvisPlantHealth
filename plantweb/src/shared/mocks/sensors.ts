export const mockSensorData = [
    {
        id: 1,
        name: 'Sensor 1',
        call_frequency: '5****',
    },
    {
        id: 2,
        name: 'Sensor 2',
        call_frequency: '5****'
    },
    {
        id: 3,
        name: 'Sensor 3',
        call_frequency: '5****'
    },
    {
        id: 4,
        name: 'Sensor 4',
        call_frequency: '5****'
    }
];

export const getSensorByID = (id: string) => {
    return mockSensorData.find((sensor) => sensor.id.toString() === id);
  };