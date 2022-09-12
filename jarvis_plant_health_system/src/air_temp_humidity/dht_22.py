import adafruit_dht
import board

# import json
import time

# Initial the dht device, with data pin connected to:
# dhtDevice = adafruit_dht.DHT22(board.D6)

# you can pass DHT22 use_pulseio=False if you wouldn't like to use pulseio.
# This may be necessary on a Linux single board computer like the Raspberry Pi,
# but it will not work in CircuitPython.

# method to red the DHT22
async def readDHT(GPIO_pin):
    # set the pin connection number
    try:
        if GPIO_pin == 0:
            connection_pin = board.D0
        if GPIO_pin == 1:
            connection_pin = board.D1
        if GPIO_pin == 2:
            connection_pin = board.D2
        if GPIO_pin == 3:
            connection_pin = board.D3
        if GPIO_pin == 4:
            connection_pin = board.D4
        if GPIO_pin == 5:
            connection_pin = board.D5
        if GPIO_pin == 6:
            connection_pin = board.D6
        if GPIO_pin == 7:
            connection_pin = board.D7
        if GPIO_pin == 8:
            connection_pin = board.D8
        if GPIO_pin == 9:
            connection_pin = board.D9
        if GPIO_pin == 10:
            connection_pin = board.D10
        if GPIO_pin == 11:
            connection_pin = board.D11
        if GPIO_pin == 12:
            connection_pin = board.D12
        if GPIO_pin == 13:
            connection_pin = board.D13
        if GPIO_pin == 14:
            connection_pin = board.D14
        if GPIO_pin == 15:
            connection_pin = board.D15
        if GPIO_pin == 16:
            connection_pin = board.D16
        if GPIO_pin == 17:
            connection_pin = board.D17
        if GPIO_pin == 18:
            connection_pin = board.D18
        if GPIO_pin == 19:
            connection_pin = board.D19
        if GPIO_pin == 20:
            connection_pin = board.D20
        if GPIO_pin == 21:
            connection_pin = board.D21
        if GPIO_pin == 22:
            connection_pin = board.D22
        if GPIO_pin == 23:
            connection_pin = board.D23
        if GPIO_pin == 24:
            connection_pin = board.D24
        if GPIO_pin == 25:
            connection_pin = board.D25
        if GPIO_pin == 26:
            connection_pin = board.D26
        if GPIO_pin == 27:
            connection_pin = board.D27
        if GPIO_pin == 28:
            connection_pin = board.D28
        if GPIO_pin == 29:
            connection_pin = board.D29
        if GPIO_pin == 30:
            connection_pin = board.D30
        if GPIO_pin == 31:
            connection_pin = board.D31
        if GPIO_pin == 32:
            connection_pin = board.D32
        if GPIO_pin == 33:
            connection_pin = board.D33
        if GPIO_pin == 34:
            connection_pin = board.D34
        if GPIO_pin == 35:
            connection_pin = board.D35
        if GPIO_pin == 36:
            connection_pin = board.D36
        if GPIO_pin == 37:
            connection_pin = board.D37
        if GPIO_pin == 38:
            connection_pin = board.D38
        if GPIO_pin == 39:
            connection_pin = board.D39
        if GPIO_pin == 40:
            connection_pin = board.D40
        if GPIO_pin == 41:
            connection_pin = board.D41
        if GPIO_pin == 42:
            connection_pin = board.D42
        if GPIO_pin == 43:
            connection_pin = board.D43
        if GPIO_pin == 44:
            connection_pin = board.D44
        if GPIO_pin == 45:
            connection_pin = board.D45
        if GPIO_pin == 46:
            connection_pin = board.D46
        if GPIO_pin == 47:
            connection_pin = board.D47
        # end of possible options
    except (ValueError, TypeError, NameError):
        print("Please look at your connection_pin value numbers must be between 0-47")

    dhtDevice = adafruit_dht.DHT22(connection_pin, use_pulseio=False)
    # define vars
    temperature_c = -333
    humidity = -333

    while (temperature_c == -333) or (humidity == -333):
        try:
            temperature_c = dhtDevice.temperature
            humidity = dhtDevice.humidity
            # Create dictionary
            dht22_json = await {"temperature_c": temperature_c, "humidity": humidity}
            return dht22_json

        except RuntimeError as error:
            # Errors happen fairly often, DHT's are hard to read, just keep going
            print(error.args[0])
            time.sleep(2.0)
            continue
        except Exception as error:
            dhtDevice.exit()
            raise error


# print(json.dumps(readDHT(6)))
