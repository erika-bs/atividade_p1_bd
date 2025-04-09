CREATE DATABASE sistema_db;

CREATE USER 'admin'@'localhost' IDENTIFIED BY '123456';

GRANT ALL PRIVILEGES ON sistema_db.* TO 'admin'@'localhost';

FLUSH PRIVILEGES;