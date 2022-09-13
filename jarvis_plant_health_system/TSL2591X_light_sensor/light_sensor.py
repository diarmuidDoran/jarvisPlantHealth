# import json
import logging
from TSL2591X_light_sensor.waveshare_TSL2591 import TSL2591


logging.basicConfig(level=logging.INFO)

sensor = TSL2591.TSL2591()
# sensor.SET_InterruptThreshold(0xff00, 0x0010)
#method to read the light presensce 
async def readLightSensor():
    try:
        # define vars
        lux = sensor.Lux
        sensor.TSL2591_SET_LuxInterrupt(50, 200)
        infrared = sensor.Read_Infrared
        visible = sensor.Read_Visible
        full_spectrum = sensor.Read_FullSpectrum

        # create dictionary
        light_sensor_json = await {
            "lux": lux,
            "infrared": infrared,
            "visible": visible,
            "full_spectrum": full_spectrum
        }

        sensor.Disable()
    except KeyboardInterrupt:    
        logging.info("ctrl + c:")
        sensor.Disable()
        exit()

    return light_sensor_json

# print(json.dumps(readLightSensor()))