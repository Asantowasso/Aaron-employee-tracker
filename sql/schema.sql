-- Creating the database --
DROP DATABASE IF EXISTS org_db;

CREATE DATABASE org_db;

USE org_db;

-- tables within the org_db --
-- department table needs names and ids --

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    d_name VARCHAR(30) NOT NULL

);

-- role table with job title, role id, department and salary --

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
j_title VARCHAR(30) NOT NULL,
d_id INT NOT NULL,
salary DECIMAL (10,2),
FOREIGN KEY (d_id) REFERENCES department(id)
ON DELETE CASCADE

);

-- employee tabe with id, first name, last name, role id and manager id --

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role (id)
    ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employee (id)
    ON DELETE SET NULL
);

