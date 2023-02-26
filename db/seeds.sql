INSERT INTO department(department_name)
VALUES
  ('HR'),
  ('Tech'),
  ('Marketing'),
  ('Finance'),
  ('Artist'),
  ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES 
  ('Recruiter', 40000, 1),
  ('Animater', 50000, 3),
  ('Singer', 400000, 2),
  ('Rapper', 30000, 4),
  ('Salesman', 35000, 5),
  ('Accountant', 20000, 6),
  ('Promoter', 60000, 7);

  INSERT INTO empolyee (first_name, last_name, role_id, manager_id)
  VALUES
    ('Davidson', 'Dodor', 1 , 1),
    ('David', 'Porter', 2, 2),
    ('Hannah','Ettienne', 1, 4 ),
    ('Rachel', 'Kruger', 3, 1),
    ('Jocelyn', 'Dodor', 2 , 3),
    ('Eli', 'Atkins', 5 , 6)


