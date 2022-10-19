
create TABLE employee(
    name VARCHAR(255),
    docName VARCHAR(255)
);

create TABLE docList(
    docName VARCHAR(255),
    docOrder INTEGER
);

INSERT INTO doclist(docName, docorder)
VALUES ('ГОСТ 123', 1),
('ГОСТ 999', 2),
('ГОСТ 333', 1);

INSERT INTO employee(name, docName)
VALUES ('Иванов И.И', 'ГОСТ 123'),
('Петров П.П', 'ГОСТ 999'),
('Сидоров С.С', 'ГОСТ 333,ГОСТ 999');