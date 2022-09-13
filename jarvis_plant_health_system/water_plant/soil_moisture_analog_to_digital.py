# Importing modules
import spidev  # To communicate with SPI devices
from numpy import interp  # To scale values
from time import sleep  # To add delay
import asyncio


# Start SPI connection
spi = spidev.SpiDev()  # Created an object
spi.open(0, 0)

# Read MCP3008 data
def analogInput(channel):
    spi.max_speed_hz = 1350000
    adc = spi.xfer2([1, (8+channel) << 4, 0])
    data = ((adc[1] & 3) << 8) + adc[2]
    return data

# Reading from CH0-7 plant soil moister sensor of the MCP3008
def checkMoistureSensor(input_pin):
    outputPlantSoilMoistureSensor = analogInput(input_pin)
    outputPlantSoilMoistureSensor = interp(
        outputPlantSoilMoistureSensor, [0, 1023], [100, 0])
    outputPlantSoilMoistureSensor = int(outputPlantSoilMoistureSensor)
    sleep(1)
    return outputPlantSoilMoistureSensor

# Reading from CH1 plant Tank moister sensor
def checkTankMoistureSensor():
    outputTanklSensor = analogInput(1)
    outputTanklSensor = interp(outputTanklSensor, [0, 1023], [100, 0])
    outputTanklSensor = int(outputTanklSensor)
    sleep(1)
    return outputTanklSensor
