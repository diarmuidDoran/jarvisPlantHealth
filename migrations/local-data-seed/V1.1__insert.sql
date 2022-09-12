INSERT INTO room (name)
VALUES 
    ('Living-room'),
    ('Kitchen'),
    ('Bed 1'),
    ('Bathroom');

INSERT INTO plant (name, room_id)
VALUES 
    ('Cheese Plant', 1),
    ('Peace Lily', 1),
    ('Olea Europaea', 2),
    ('Cheese Plant', 1),
    ('Aloe Vera', 4);

INSERT INTO health_attribute (name)
VALUES
    ('Soil Moisture'),
    ('Soil Temperature'),
    ('Air Humidity'),
    ('Air Temperature'),
    ('Light Levels');

INSERT INTO unit_measurement (unit)
VALUES
    ('%'),
    ('°C'),
    ('g.kg-1'),
    ('lux');

INSERT INTO user_account (user_name, first_name, last_name, email, password)
VALUES
    ('PlantNeglector', 'Diarmuid', 'Doran', 'diarmuid.doran@hotmail.com', 'unopassword'),
    ('PMcLaren', 'Paul', 'McCarron', 'paul.mccarron@hotmail.com', 'password');

INSERT INTO plant_user (user_id, plant_id)
VALUES
    (1,1),
    (2,2),
    (1,3),
    (1,4);

INSERT INTO sensor (sensor_name, call_frequency, connection_pin)
VALUES
    ('sensor1', '*/5 * * * *', 0),
    ('sensor2', '* 1 * * *', 1),
    ('sensor3', '*/30 * * * *', 6),
    ('sensor4', '*/30 * * * *', 18);


INSERT INTO sensor_reading (sensor_reading, time_stamp, sensor_id)
VALUES
    (1.2, '2022-07-21 09:00:00', 1),
    (1.0, '2022-07-21 09:05:00', 1),
    (0.9, '2022-07-21 09:10:00', 1);


INSERT INTO plant_health_attribute (upper_required_value, lower_required_value, unit_measurement_id, plant_id, health_attribute_id)
VALUES
    (75.00, 30.00, 1, 1, 1),
    (20.00, 2.00, 2, 1, 2),
    (40.00, 10.00, 2, 1, 3),
    (80.00, 30.00, 3, 1, 4),
    (2400.00, 0.00, 4, 1, 5);


INSERT INTO notification (notification_details, time_stamp, plant_health_attribute_id)
VALUES 
    ('Not enough water', '2022-07-21 09:10:00', 1);


INSERT INTO sensor_plant_health_attribute (plant_health_attribute_id, sensor_id)
VALUES
    (1,1),
    (2,2);

