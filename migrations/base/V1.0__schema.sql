CREATE TABLE IF NOT EXISTS room(
    id serial PRIMARY KEY,
    name VARCHAR (255) NOT NULL
);

CREATE TABLE IF NOT EXISTS plant(
   id serial PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   room_id INT NOT NULL,
   is_deleted BOOL NOT NULL DEFAULT false,
   CONSTRAINT fk_room_room_id
        FOREIGN KEY(room_id)
        REFERENCES room(id)
);

CREATE TABLE IF NOT EXISTS sensor
(
    id serial PRIMARY KEY,
    sensor_name VARCHAR(255) NOT NULL,
    call_frequency VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS sensor_reading
(
    id serial PRIMARY KEY,
    sensor_reading DECIMAL(10,2) NOT NULL,
    time_stamp TIMESTAMP NOT NULL,
    sensor_id INT NOT NULL,
    CONSTRAINT fk_sensor_sensor_id
        FOREIGN KEY(sensor_id)
        REFERENCES sensor(id)
);

CREATE TABLE IF NOT EXISTS unit_measurement
(
    id serial PRIMARY KEY,
    unit VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS health_attribute
(
    id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS plant_health_attribute
(
    id serial PRIMARY KEY,
    upper_required_value DECIMAL(10,2) NOT NULL,
    lower_required_value DECIMAL(10,2) NOT NULL,
    unit_measurement_id INT NOT NULL,
    plant_id INT NOT NULL,
    health_attribute_id INT NOT NULL,
    is_deleted BOOL NOT NULL DEFAULT false,
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

CREATE TABLE IF NOT EXISTS sensor_plant_health_attribute
(
    id serial PRIMARY KEY,
    plant_health_attribute_id INT NOT NULL,
    sensor_id INT NOT NULL,
    is_deleted BOOL NOT NULL DEFAULT false,
    CONSTRAINT fk_plant_health_attribute_plant_health_attribute_id
        FOREIGN KEY(plant_health_attribute_id)
        REFERENCES plant_health_attribute(id),
    CONSTRAINT fk_sensor_sensor_id_b
        FOREIGN KEY(sensor_id)
        REFERENCES sensor(id)
);

CREATE TABLE IF NOT EXISTS user_account
(
    id serial PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS plant_user
(
    id serial PRIMARY KEY,
    plant_id INT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_plant_plant_id_b
        FOREIGN KEY(plant_id)
        REFERENCES plant(id),
    CONSTRAINT fk_user_user_account_id
        FOREIGN KEY(user_id)
        REFERENCES user_account(id)
);

CREATE TABLE IF NOT EXISTS notification
(
    id serial PRIMARY KEY,
    notification_details text NOT NULL,
    time_stamp TIMESTAMP NOT NULL,
    plant_health_attribute_id INT NOT NULL,
    CONSTRAINT fk_plant_health_attribute_plant_health_attribute_id_b
        FOREIGN KEY(plant_health_attribute_id)
        REFERENCES plant_health_attribute(id)
);