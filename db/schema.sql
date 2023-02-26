CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id  INT NOT NULL,
  CONSTRAINT fk_department
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE empolyee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  CONSTRAINT fk_role 
  FOREIGN KEY(role_id)
  REFERENCES role(id)
  ON DELETE SET NULL,
  CONSTRAINT fk_employee 
  FOREIGN KEY(manager_id) 
  REFERENCES empolyee(id)
);
