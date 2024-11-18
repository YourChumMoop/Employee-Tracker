\c company_db;

INSERT INTO department (name)
VALUES ('Administration'),
       ('Human Resources'),
       ('Research and Development'),
       ('Sanitation'),
       ('Information Technology'),
       ('Sales');

INSERT INTO role (title,salary,department_id)
VALUES ('CEO',250000.00,1),
       ('HR Manager',90000.00,2),
       ('Head of Sales',113000.00,6),
       ('Sales Service Rep',65000.00,6),
       ('Janitor',67000.00,4),
       ('IT Lead',120000.00,5),
       ('Help Desk',45000.00,5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Matt', 'Oberdalhoff', 1, NULL),
       ('Bob','Koleson',2,1),
       ('Stacy','Morgon',3,1),
       ('Greg','Abernathy',4,3),
       ('Megan','Folger',5,1),
       ('Janice','Smith',6,1);
