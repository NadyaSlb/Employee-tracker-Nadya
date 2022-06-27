INSERT INTO department
  (id, department_name)
VALUES
  ('1', 'IT'),
  ('2', 'accounting'),
  ('3', 'HR');

  INSERT INTO employee_role
  (id, title, salary, department_id)
VALUES
  ('1', 'project manager', '100000', '1'),
  ('2', 'programmer', '80000', '1'),
  ('3', 'tester', '50000', '1'),
  ('4', 'chief accountant', '100000', '2'),
  ('5', 'accountant', '80000', '2'),
  ('6', 'recruiter', '50000', '3');

  INSERT INTO employee
  (id, first_name, last_name, role_id, manager_id)
VALUES
  ('1', 'Willy', 'Shake', '1', null),
  ('2', 'Fred', 'Dust', '2', '1'),
  ('3', 'Leo', 'Tost', '3', '1'),
  ('4', 'Charly', 'Dick', '4', null),
  ('5', 'Jack', 'Green', '5', '4'),
  ('6', 'Vick', 'White', '6', '1');