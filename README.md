# J.A.R.V.I.S_Plant_Health_Monitoring_System

Jarvis Plant Health Monitoring System is a program that is designed to check and record your plants health attributes. The system is currently set upto check in on the following plant health attributes:

- Soil Moisture precentage level
- Ambient Air Temperature
- Ambient Air Humidity
- Surrounding Light lux levels

Based on the data collected from the plants registered sensors the program will determine when your plant requires water and automatically pump water from your pre-filled tank. After the program has checked in on your plant it will issue your email with notifications related to the sensor readings and the actions taken.

## Hardware requirements

For this iteration you require the below list of components to construct your own J.A.R.V.I.S_Plant_Health_Monitoring_System:

<ul>
    <li><a href="https://thepihut.com/products/raspberry-pi-starter-kit" target="_blank">Raspberry Pi 4B</a> (Raspberry Pi 3 should also be compatable with the program)</li>
    <li><a href="https://www.amazon.co.uk/WayinTop-Electronics-Electronic-Breadboard-Resistance/dp/B07Z1QP5M2/ref=sr_1_4?keywords=breadboard+electronics+starter+kit&qid=1663161112&sprefix=bread+board+ele%2Caps%2C76&sr=8-4" target="_blank">Bread borad and jumper wires</a> (If you are a beginner the kit in the link is recommended)</li>
    <li><a href="https://thepihut.com/products/adafruit-mcp3008-8-channel-10-bit-adc-with-spi-interface?variant=811412169&currency=GBP&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&gclid=Cj0KCQjw94WZBhDtARIsAKxWG-_BgEHD2OYIEyMjs4I9IWX1Tj_egEG_KkA9_jbVtuiMoS7X0hkx3gQaAg-DEALw_wcB" target="_blank">MCP3008</a> (This will handle our analog to digital conversion for some sensors)</li>
    <li><a href="https://www.amazon.co.uk/AITRIP-Capacitive-Corrosion-Resistant-Electronic/dp/B094NG3MCD/ref=asc_df_B094NG3MCD/?tag=googshopuk-21&linkCode=df0&hvadid=536027887139&hvpos=&hvnetw=g&hvrand=10728619633682327616&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9045206&hvtargid=pla-1397354682172&psc=1" target="_blank">Capacitive soil moisture sensors</a> (One per plant and one for the tank.)</li>
    <li><a href="https://www.amazon.co.uk/RUNCCI-YUN-Submersible-Brushless-Flexible-Garde%EF%BC%88Vertical%EF%BC%89%EF%BC%88black%EF%BC%89/dp/B08BZBN29C/ref=sr_1_2_sspa?keywords=5v+water+pump&qid=1663162026&s=outdoors&sr=1-2-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUExNExGWjhKRjNYTjFEJmVuY3J5cHRlZElkPUExMDE5MjUzMlROM04xNDBYRVNUMSZlbmNyeXB0ZWRBZElkPUEwNDEzMTg3MURYSjNXTFUzTEE2WCZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU=" target="_blank">Mini water pumps 3-5V</a></li>
    <li><a href="https://www.amazon.co.uk/SUNFOUNDER-Channel-Shield-Arduino-Raspberry/dp/B00E0NSORY/ref=asc_df_B00E0NSORY/?tag=googshopuk-21&linkCode=df0&hvadid=309932695585&hvpos=&hvnetw=g&hvrand=14093773404688056348&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9045206&hvtargid=pla-438786682067&psc=1" target="_blank">4 way relay </a>(will allow up to 4 pumps to be used)</li>
    <li><a href=" https://www.amazon.co.uk/CQRobot-Ambient-Compatible-Raspberry-TSL25911FN/dp/B083KM51DF/ref=sr_1_2?crid=28STMU95TZ3QW&keywords=tsl25911fn+ambient+light+sensor&qid=1663162786&sprefix=tsl25911fn+ambient+light+sensor%2Caps%2C49&sr=8-2" target="_blank">Ambient light sensor </a></li>
    <li><a href=" https://thepihut.com/products/dht22-temperature-humidity-sensor?variant=39627167629507&currency=GBP&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&gclid=Cj0KCQjw94WZBhDtARIsAKxWG--XSme7hepkckMqbJITdaK5GP7GUUytjfJPSQ054luubeUW9rRshssaAud7EALw_wcB" target="_blank">DHT_22 Ait temp & humidity sensor </a></li>
    <li>
    A Tank (this iteration uses an old plastic bottle. Reduce, Reuse, Recycle)</li>
</ul>

## Hardware setup

You will also require a <b>soldering kit</b> to join some of the wires. If you purchase a higher voltiage pump you can still use the software program, however your hardware set up will be slightly different. If you have purchased the items above then you can follow the set up below. The table details each connection, alternativly follow the wiring schematic below. The RHS of the bread board in this example is 5V while the LHS is 3V.

| Component One        | Pin Number             | Componet Two   | Connection Point |
| -------------------- | ---------------------- | -------------- | ---------------- |
| Raspberry Pi 4       | Pin 1, 3V3             | Bread board    | LHS Power Rail + |
| Raspberry Pi 4       | Pin 9, GND             | Bread board    | LHS Power Rail - |
| MCP3008              | V<sub>DD</sub>         | Bread board    | LHS Power Rail + |
| MCP3008              | V<sub>REF</sub>        | Bread board    | LHS Power Rail + |
| MCP3008              | AGND                   | Bread board    | LHS Power Rail - |
| MCP3008              | CLK                    | Raspberry Pi 4 | Pin 23, GPIO 11  |
| MCP3008              | D<sub>out</sub>        | Raspberry Pi 4 | Pin 21, GPIO 09  |
| MCP3008              | D<sub>in</sub>         | Raspberry Pi 4 | Pin 19, GPIO 10  |
| MCP3008              | CS/SHDN                | Raspberry Pi 4 | Pin 24, GPIO 8   |
| MCP3008              | DGND                   | Bread board    | LHS Power Rail - |
| Soil Moisture Sensor | AOUT                   | MCP3008        | CH0              |
| Soil Moisture Sensor | VCC                    | Bread board    | LHS Power Rail + |
| Soil Moisture Sensor | GND                    | Bread board    | LHS Power Rail - |
| Soil Moisture Sensor | AOUT                   | MCP3008        | CH1              |
| Soil Moisture Sensor | VCC                    | Bread board    | LHS Power Rail + |
| Soil Moisture Sensor | GND                    | Bread board    | LHS Power Rail - |
| DHT_22               | Data                   | Raspberry Pi 4 | 31, GPIO6        |
| DHT_22               | VCC                    | Bread board    | LHS Power Rail + |
| DHT_22               | GND                    | Bread board    | LHS Power Rail - |
| TSL2591x             | VCC                    | Bread board    | LHS Power Rail + |
| TSL2591x             | GND                    | Bread board    | LHS Power Rail - |
| TSL2591x             | INT                    | Raspberry Pi 4 | 12, GPIO18       |
| TSL2591x             | SCL                    | Raspberry Pi 4 | 5, GPIO3         |
| TSL2591x             | SDA                    | Raspberry Pi 4 | 3, GPIO2         |
| Raspberry Pi 4       | Pin 4, 5V              | Bread board    | RHS Power Rail + |
| Raspberry Pi 4       | Pin 39, GND            | Bread board    | RHS Power Rail - |
| Raspberry Pi 4       | Pin 2, 5V              | RELAY          | VCC              |
| Raspberry Pi 4       | Pin 6, GND             | RELAY          | GND              |
| Raspberry Pi 4       | Pin 7 , GPIO4          | RELAY          | IN1              |
| RELAY                | N1 PIN 2 (FROM BOTTOM) | Bread board    | RHS Power Rail - |
| RELAY                | N1 PIN 3 (FROM BOTTOM) | Pump           | Black Wire       |
| Pump                 | Red wire               | Bread board    | RHS Power Rail + |

Here are the Raspberry Pi 4 and MCP3008 pin digrams:

![](./images/raspberry%20pi%204%20gpio%20schematic.png?raw=true)

![](./images/mcp3008pin.gif?raw=true)

Here is the hardware wiring schematic:
![](./images/plant%20hardware.jpg?raw=true)

## Installing J.A.R.V.I.S_Plant_Health_Monitoring_System Software

On your Raspberry Pi device or on the Pi remotly from your computer using <b>VSCode</b> and <b>Remote-SSH extension</b>. Heres a useful link to follow if you opt to install from your computer remotely, <a href="https://cloudbytes.dev/snippets/develop-remotely-on-raspberry-pi-using-vscode-remote-ssh" target="__balnk">VSCode remote access to Raspberry Pi</a>.

Open your terminal so it is on the raspberry pi 4 desktop level(<b>pi@raspberrypi</b>:~/Desktop/)

Make sure you have github packages installed on your raspberry pi to proforem the pull request for the J.A.R.V.I.S Plant Health System software.
<a href="https://github.com/cli/cli/blob/trunk/docs/install_linux.md" target="_blank">Link Here.</a>

<pre>
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
&& sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
&& sudo apt update \
&& sudo apt install gh -y
#complete github install, you will need a github account to login with.
sudo apt update
sudo apt install gh
gh auth login
</pre>

Log into Github.com
use SSH for the Git operations
authenticate github CLI with Login with web browser

Install the software.

<pre>
gh repo clone diarmuidDoran/jarvisPlantHealth
</pre>

Once the pull request is done you will need to configure your Raspberry Pi slightly to let the program run as intended.

Open your Raspberry Pi's start menu, open Preferences and Open Pi Configuration.
Within the Raspberry Pi Configuration open the Interfaces tab. You now need to Enable SPI, I2C and 1-Wire if not already enabled. After this reboot your Pi.

Open the terminal in your pi again.

<pre>
cd ~/Desktop/jarvis_plant_health_git/jarvisPlantHealth
docker-compose up
</pre>

This will build the open source API (Port:5000/documented_api/doc), the react web application (Port:80) and the automation system to monitor your plants. Please wait a few mins for everything to complete.

With everything set up, please enjoy using J.A.R.V.I.S Plant Helath Monitoring System.
