-- Creating the database --

CREATE DATABASE org_db;

USE org_db;

--tables within the org_db--
-- department table needs names and ids --

CREATE TABLE department (
    id INT NOT NULL,
    d_name VARCHAR(30) NULL,
    PRIMARY KEY (id)

);