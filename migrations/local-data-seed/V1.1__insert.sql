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

INSERT INTO sensor (sensor_name, call_frequency)
VALUES
    ('sensor1', '5 * * * *'),
    ('sensor2', '* 1 * * *');

