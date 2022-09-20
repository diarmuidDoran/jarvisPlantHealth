#!/usr/bin/env python3
# External module imp
from pickletools import int4
import RPi.GPIO as GPIO  # communicate withe the sensors and pump
import datetime  # used to log the sensor_readings
from time import sleep
import water_plant.soil_moisture_analog_to_digital as moisture_sensor
import requests
from notifications import send_email

GPIO.setmode(GPIO.BCM)  # Broadcom pin-numbering scheme
pump_pin = 4  # update number based on connection pin GPIO number (on Raspberry Pi)


def init_output(pin):
    GPIO.setup(pin, GPIO.OUT)
    GPIO.output(pin, GPIO.LOW)
    GPIO.output(pin, GPIO.HIGH)


def pump_on():
    pump_pin = 4
    init_output(pump_pin)
    GPIO.output(pump_pin, GPIO.LOW)
    sleep(4)  # update if your pump need longer to effectivly water the plant.
    GPIO.output(pump_pin, GPIO.HIGH)


def water_required_check(
    moisture_sensor_pin: int,
    plant_id: int,
    sensor_id: int,
    plant_health_attribute_id: int,
    reciever_email: str,
):
    # print ("Waaaaaaaaaaaater" + str(plant_health_attribute_id))

    rooms = requests.get(f"http://localhost5000/documented_api/rooms")
    rooms = rooms.json()
    plant_health_attribute_response = requests.get(
        f"http://localhost5000/documented_api/plants/{plant_id}/plant_health_attributes"
    )
    plant_health_attribute = plant_health_attribute_response.json()
    plant_name = plant_health_attribute["name"]
    plant_room = plant_health_attribute["room_id"]
    for room in rooms:
        if room["id"] == plant_room:
            plant_room = room["name"]
            # print(plant_room)
    pump_pin = 4

    sensor_reading = moisture_sensor.checkMoistureSensor(moisture_sensor_pin)
    time = datetime.datetime.now()

    if sensor_reading <= 35:
        init_output(pump_pin)
        requests.post(
            f"http://localhost5000/documented_api/sensors/{sensor_id}/readings",
            json={"sensor_reading": sensor_reading, "time_stamp": str(time)},
        )
        pump_on()
        message = (
            "Moisture in plant soil: "
            + str(sensor_reading)
            + "\nYour plant has been watered."
        )

        requests.post(
            f"http://localhost5000/documented_api/notifications",
            json={
                "notification_details": str(message),
                "time_stamp": "2022-09-09T15:40:10.792853",
                "plant_health_attribute_id": int(plant_health_attribute_id),
            },
        )
        send_email(reciever_email, message)

    elif (
        moisture_sensor.checkMoistureSensor(moisture_sensor_pin) >= 35
        and moisture_sensor.checkMoistureSensor(moisture_sensor_pin) <= 80
    ):

        requests.post(
            f"http://localhost5000/documented_api/sensors/{sensor_id}/readings",
            json={"sensor_reading": sensor_reading, "time_stamp": str(time)},
        )

        message = (
            str(plant_name)
            + "'s soil is damp. No actions Required.  \nLocation: "
            + str(plant_room)
        )

        requests.post(
            f"http://localhost5000/documented_api/notifications",
            json={
                "notification_details": str(message),
                "time_stamp": str(time),
                "plant_health_attribute_id": int(plant_health_attribute_id),
            },
        )
        send_email(reciever_email, message)

    else:
        message = (
            "You plant "
            + str(plant_name)
            + " needs checked.  \nLocation: "
            + str(plant_room)
        )

        requests.post(
            f"http://localhost5000/documented_api/sensors/{sensor_id}/readings",
            json={"sensor_reading": sensor_reading, "time_stamp": str(time)},
        )

        requests.post(
            f"http://localhost5000/documented_api/notifications",
            json={
                "notification_details": str(message),
                "time_stamp": str(time),
                "plant_health_attribute_id": int(plant_health_attribute_id),
            },
        )
        send_email(reciever_email, message)

    GPIO.cleanup()  # cleanup all GPI


def tank_water_check(plant_health_attribute_id: int, reciever_email: str):
    # print("Taaaaaaaaaaaaaank " + str(plant_health_attribute_id))
    outputTanklSensor = moisture_sensor.checkTankMoistureSensor()
    time = datetime.datetime.now()
    formated_datetime = time

    if outputTanklSensor <= 40:
        message = (
            "Moisture in tank:" + str(outputTanklSensor) + "\nTime to top up your tank"
        )
        requests.post(
            f"http://localhost5000/documented_api/notifications",
            json={
                "notification_details": str(message),
                "time_stamp": str(formated_datetime),
                "plant_health_attribute_id": int(plant_health_attribute_id),
            },
        )
    else:
        message = "Moisture in tank:" + str(outputTanklSensor) + "\nWater level ok."
        requests.post(
            f"http://localhost5000/documented_api/notifications",
            json={
                "notification_details": str(message),
                "time_stamp": str(formated_datetime),
                "plant_health_attribute_id": int(plant_health_attribute_id),
            },
        )
        send_email(reciever_email, message)
