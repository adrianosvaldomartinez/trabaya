-- to create a new database
CREATE DATABASE trabaya1;

-- to use database
use trabaya1;

-- creating a new table
CREATE TABLE trabayamain (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  estudio VARCHAR(50) NOT NULL,
  movilidad VARCHAR(100) NOT NULL,
  sexo VARCHAR(100) NOT NULL,
  telefono VARCHAR(15)
);

-- to show all tables
show tables;

-- to describe table
describe trabaya1;

