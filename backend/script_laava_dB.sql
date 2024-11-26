
-- create relation farmer

CREATE TABLE farmer (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    home_address VARCHAR(255),
    username VARCHAR(255),
    email VARCHAR(255),
    phone_number VARCHAR(20),
    password VARCHAR(255)
);

INSERT INTO farmer (name, surname, home_address, username, email, phone_number, password) 
VALUES 
('John', 'Doe', '123 Main St', 'johndoe', 'john.doe@email.com', '555-1234', 'password123'),
('Jane', 'Smith', '456 Oak St', 'janesmith', 'jane.smith@email.com', '555-5678', 'securepass'),
('Bob', 'Johnson', '789 Pine St', 'bobjohnson', 'bob.johnson@email.com', '555-9101', 'pass123word'),
('Alice', 'Williams', '101 Maple St', 'alicewilliams', 'alice.williams@email.com', '555-1122', 'p@ssw0rd');


-- Create the sensor_data table
CREATE TABLE sensor_data (
    id SERIAL PRIMARY KEY,
    soil_moisture INTEGER,
    temperature FLOAT,
    humidity FLOAT,
    timestamp TIMESTAMP
);

-- Insert the sensor data
INSERT INTO sensor_data (soil_moisture, temperature, humidity, timestamp) VALUES
(589, 30, 37.6, '2024-03-10 13:08:52.75793'),
(589, 30, 37.6, '2024-03-10 13:09:54.485163'),
(589, 30, 37.6, '2024-03-10 13:10:52.84055'),
(1021, 30, 38.7, '2024-03-10 13:13:10.8088'),
(1021, 30, 38.7, '2024-03-10 13:14:10.669123'),
(1021, 30, 38.7, '2024-03-10 13:15:10.592561'),
(1021, 29.9, 38.3, '2024-03-10 13:16:30.190491'),
(1021, 29.9, 38.3, '2024-03-10 13:17:29.961271'),
(1021, 30, 39.1, '2024-03-10 13:19:52.367134'),
(1021, 30, 39.1, '2024-03-10 13:20:52.095482'),
(489, 30.1, 55.5, '2024-03-10 13:22:13.527405'),
(489, 30.1, 55.5, '2024-03-10 13:23:18.116441'),
(477, 30, 38.1, '2024-03-10 13:24:40.155057'),
(477, 30, 38.1, '2024-03-10 13:25:40.014104'),
(477, 30, 38.1, '2024-03-10 13:26:40.034186'),
(477, 30, 38.1, '2024-03-10 13:27:39.837181'),
(477, 30, 38.1, '2024-03-10 13:28:39.821204');


