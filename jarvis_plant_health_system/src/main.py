from asyncio import streams
from pickletools import int4
from notifications import send_email
from water_plant import water
from air_temp_humidity import dht_22
from TSL2591X_light_sensor import light_sensor

# import json - used for manual testing

import smtplib  # needed to send email notifications
import requests
import asyncio
import time
import datetime  # used to log the sensor_readings
from cron_validator import CronValidator
from cron_validator.util import str_to_datetime

reciever_email = "jarvis.plants@gmail.com"  # change email to the email you what notifications issued too

start_time = datetime.datetime.now()
formated_time = start_time.strftime("%Y-%m-%d %H:%M")
dt = str_to_datetime(formated_time)
# print(start_time)


async def health_check_asyc():
    # required plants api calls
    print("Health check start")
    plants_response = requests.get("http://localhost5000/documented_api/plants")
    plants = plants_response.json()
    # print(plants)
    # loop through all plants
    for plant in plants:
        print("plant: " + plant["name"])
        plant_id = plant["id"]
        # get the current plants plant health attributes
        plant_plant_health_attribute_response = requests.get(
            f'http://localhost5000/documented_api/plants/{(plant["id"])}/plant_health_attributes'
        )
        plant_plant_health_attribute = plant_plant_health_attribute_response.json()
        # print(plant_health_attribute)
        # extract the plant health attributes from the json file
        plant_health_attributes = plant_plant_health_attribute[
            "plant_health_attributes"
        ]
        for plant_health_attribute in plant_health_attributes:
            # get the health_attributes_id to determine which sensor processes to run,
            # get the sensor to cheeck the pin connection and call frequency
            plant_health_attribute_id = plant_health_attribute["id"]
            upper_limit = plant_health_attribute["upper_required_value"]
            lower_limit = plant_health_attribute["lower_required_value"]
            health_attribute_id = plant_health_attribute["health_attribute_id"]
            # print("Plant: "+str(plant))
            # print("health attribute id: "+str(health_attribute_id))
            sensor = plant_health_attribute["sensor"]
            sensor_id = sensor["id"]
            sensor_call_frequency = sensor["call_frequency"]
            sensor_conn_pin = sensor["connection_pin"]
            if CronValidator.match_datetime(sensor_call_frequency, dt):
                if health_attribute_id == 1:
                    # print("Connection_pin: "+ str(sensor_conn_pin))
                    water.water_required_check(
                        sensor_conn_pin,
                        plant_id,
                        sensor_id,
                        plant_health_attribute_id,
                        reciever_email,
                    )
                    water.tank_water_check(plant_health_attribute_id, reciever_email)

                if health_attribute_id == 2:
                    # not yet implemented due to time constaraints
                    print("sensor functionality not ready please allow more time")

                if (health_attribute_id == 3) or (health_attribute_id == 4):
                    dht_22_reading = dht_22.readDHT(sensor_conn_pin)
                    temperature_c = dht_22_reading["temperature_c"]
                    humidity = dht_22_reading["humidity"]
                    print("Connection_pin: " + str(sensor_conn_pin))
                    if health_attribute_id == 3:
                        sensor_reading = int(temperature_c)
                        time = datetime.datetime.now()
                        formated_datetime = time

                        requests.post(
                            f"http://localhost5000/documented_api/sensors/{sensor_id}/readings",
                            json={
                                "sensor_reading": sensor_reading,
                                "time_stamp": str(formated_datetime),
                            },
                        )
                        if sensor_reading < lower_limit or sensor_reading > upper_limit:

                            message = "Your air temperature levels specified for you plant are outside your set limits.\n"
                            (
                                +"Air temp. levels set as optimal are between "
                                + str(upper_limit)
                                + " - "
                                + str(lower_limit)
                                + ".\n"
                            )
                            +"Recorded air temperature: " + str(temperature_c)
                            requests.post(
                                f"http://localhost5000/documented_api/notifications",
                                json={
                                    "notification_details": str(message),
                                    "time_stamp": str(formated_datetime),
                                    "plant_health_attribute_id": int(
                                        plant_health_attribute_id
                                    ),
                                },
                            )
                            send_email(reciever_email, message)

                    if health_attribute_id == 4:
                        sensor_reading = int(humidity)
                        time = datetime.datetime.now()
                        formated_datetime = time

                        requests.post(
                            f"http://localhost5000/documented_api/sensors/{sensor_id}/readings",
                            json={
                                "sensor_reading": sensor_reading,
                                "time_stamp": str(formated_datetime),
                            },
                        )
                        if sensor_reading < lower_limit or sensor_reading > upper_limit:

                            message = "Your air humidity levels specified for you plant are outside your set limits.\n"
                            (
                                +"Air humidity levels set as optimal are between "
                                + str(upper_limit)
                                + " - "
                                + streams(lower_limit)
                                + "."
                            )
                            +"\nRecorded air humidity: " + str(humidity)
                            requests.post(
                                f"http://localhost5000/documented_api/notifications",
                                json={
                                    "notification_details": str(message),
                                    "time_stamp": str(formated_datetime),
                                    "plant_health_attribute_id": int(
                                        plant_health_attribute_id
                                    ),
                                },
                            )
                            send_email(reciever_email, message)

                if health_attribute_id == 5:
                    light_sensor_reading = light_sensor.readLightSensor()
                    lux = light_sensor_reading["lux"]
                    infrared = light_sensor_reading["infrared"]
                    visible = (light_sensor_reading["visible"],)
                    full_spectrum = light_sensor_reading["full_spectrum"]

                    sensor_reading = int(
                        lux
                    )  # input which ever light reading you wish, sensor could be set up to record all these light frequencys seperatly
                    time = datetime.datetime.now()
                    formated_datetime = time

                    requests.post(
                        f"http://localhost5000/documented_api/sensors/{sensor_id}/readings",
                        json={
                            "sensor_reading": sensor_reading,
                            "time_stamp": str(formated_datetime),
                        },
                    )

                    if sensor_reading < lower_limit or sensor_reading > upper_limit:

                        message = "Your light levels specified for you plant are outside your set limits.\n"
                        (
                            +"Light levels set as optimal are between "
                            + str(upper_limit)
                            + " - "
                            + str(lower_limit)
                            + ".\n"
                        )
                        +"Recorded light lux levels: " + str(lux)
                        requests.post(
                            f"http://localhost5000/documented_api/notifications",
                            json={
                                "notification_details": str(message),
                                "time_stamp": str(formated_datetime),
                                "plant_health_attribute_id": int(
                                    plant_health_attribute_id
                                ),
                            },
                        )
                        send_email(reciever_email, message)


async def main():
    await asyncio.gather(health_check_asyc())


if __name__ == "__main__":
    s = time.perf_counter()
    asyncio.run(main())
    elapsed = time.perf_counter() - s
    print(f"{__file__} executed in {elapsed:0.2f} seconds.")
