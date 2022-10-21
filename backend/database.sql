
-- create TABLE employee(
--     name VARCHAR(255),
--     docName VARCHAR(255)
-- );

-- create TABLE docList(
--     docName VARCHAR(255),
--     docOrder INTEGER
-- );

-- INSERT INTO doclist(docName, docorder)
-- VALUES ('ГОСТ 123', 1),
-- ('ГОСТ 999', 2),
-- ('ГОСТ 333', 1);

-- INSERT INTO employee(name, docName)
-- VALUES ('Иванов И.И', 'ГОСТ 123'),
-- ('Петров П.П', 'ГОСТ 999'),
-- ('Сидоров С.С', 'ГОСТ 333,ГОСТ 999');


create TABLE employee(
    name VARCHAR(255)
);

create Table orders(
    name VARCHAR(255),
    docName VARCHAR(255)
);

INSERT INTO employee(name)
VALUES('Иванов И.И.'),
('Петров П.П.'),
('Сидоров С.С.');

INSERT INTO orders(name, docname)
VALUES('Иванов И.И.', 'ГОСТ 111'),
('Иванов И.И.', 'ГОСТ 222'),
('Иванов И.И.', 'ГОСТ 333'),
('Петров П.П.', 'ГОСТ 111'),
('Петров П.П.', 'ГОСТ 123'),
('Петров П.П.', 'ГОСТ 999'),
('Сидоров С.С.', 'ГОСТ 111'),
('Сидоров С.С.', 'ГОСТ 12345'),
('Сидоров С.С.', 'ГОСТ 777');

