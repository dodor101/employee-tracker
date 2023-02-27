INSERT INTO department (name)
VALUES ('HR'),
       ('Sales'),
       ('Management'),
       ('Artist');

INSERT INTO role (title, salary, department_id)
VALUES ('Regional Manager', 320000, 1),
       ('Assistant to Regional Manager', 90000, 1),
       ('Sales Representative', 50000, 2),
       ('HR Representative', 70000, 3),
       ('Top Artist', 55000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Davidson', 'Dodor', 1, NULL),
       ('Dave', 'Porter', 2, 1),
       ('Joe', 'Porter', 3, 1),
       ('Vicky', 'Anderson', 4, 1),
       ('Hannah', 'Ettienne', 5, 1);



