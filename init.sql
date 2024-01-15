CREATE DATABASE IF NOT EXISTS secure_webapp;

use secure_webapp;

CREATE TABLE IF NOT EXISTS user (
    id int PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    age INT
)