START TRANSACTION;
--Creation of room table
CREATE TABLE IF NOT EXISTS room (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

--Creation of product table
CREATE TABLE IF NOT EXISTS plant (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `name` varchar(255) NOT NULL,
   `room_id` int(11) NOT NULL,
   PRIMARY KEY (id),
   CONSTRAINT fk_room_room_id
        FOREIGN KEY(room_id)
        REFERENCES room(id)
);

--Creation of sensor table
CREATE TABLE IF NOT EXISTS sensor (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `sensor_name` varchar(255) NOT NULL,
    `call_frequency` varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

--Creation of sensor_reading table
CREATE TABLE IF NOT EXISTS sensor_reading (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `sensor_reading` decimal(10,2) NOT NULL,
    `time_stamp` datetime NOT NULL,
    `sensor_id` int(11) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_sensor_sensor_id
        FOREIGN KEY(sensor_id)
        REFERENCES sensor(id)
);

--Creation of unit_measurement table
CREATE TABLE IF NOT EXISTS unit_measurement (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `unit` varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

--Creation of health_attribute table
CREATE TABLE IF NOT EXISTS health_attribute (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `health_attribute_name` varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

--creation of plant_health_attribute table
CREATE TABLE IF NOT EXISTS plant_health_attribute (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `upper_required_value` decimal(10,2) NOT NULL,
    `lower_required_value` decimal(10,2) NOT NULL,
    `unit_measurement_id` int(11) NOT NULL,
    `plant_id` int(11) NOT NULL,
    `health_attribute_id` int(11) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_unit_measurement_unit_measurement_id
        FOREIGN KEY(unit_measurement_id)
        REFERENCES unit_measurement(id),
    CONSTRAINT fk_plant_plant_id
        FOREIGN KEY(plant_id)
        REFERENCES plant(id),
    CONSTRAINT fk_health_attribute_health_attribute_id
        FOREIGN KEY(health_attribute_id)
        REFERENCES health_attribute(id)
);

--Creation of sensor_plant_health_attribute table
CREATE TABLE IF NOT EXISTS sensor_plant_health_attribute (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `plant_health_attribute_id` int(11) NOT NULL,
    `sensor_id` int(11) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_plant_health_attribute_plant_health_attribute_id
        FOREIGN KEY(plant_health_attribute_id)
        REFERENCES plant_health_attribute(id),
    CONSTRAINT fk_sensor_sensor_id_b
        FOREIGN KEY(sensor_id)
        REFERENCES sensor(id)
);

--Creation of user_account table
CREATE TABLE IF NOT EXISTS user_account (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_name` varchar(255) NOT NULL,
    `first_name` varchar(255) NOT NULL,
    `last_name` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

--Creation of plant_user
CREATE TABLE IF NOT EXISTS plant_user (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `plant_id` int(11) NOT NULL,
    `user_id` int(11) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_plant_plant_id_b
        FOREIGN KEY(plant_id)
        REFERENCES plant (id),
    CONSTRAINT fk_user_user_account_id
        FOREIGN KEY(user_id)
        REFERENCES user_account (id)
);

--Creation of the notification table
CREATE TABLE IF NOT EXISTS notifications(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `notification_details` text NOT NULL,
    `time_stamp` datetime NOT NULL,
    `user_id` int(11) NOT NULL,
    `plant_health_attribute_id` int(11) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_user_user_account_id_b
        FOREIGN KEY(user_id)
        REFERENCES user_account(id),
    CONSTRAINT fk_plant_health_attribute_plant_health_attribute_id_b
        FOREIGN KEY(plant_health_attribute_id)
        REFERENCES plant_health_attribute(id)
);
COMMIT;