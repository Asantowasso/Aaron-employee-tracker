USE org_db;

INSERT INTO department (id, d_name)
VALUES
    (1, "QA"),
    (2, "Legal"),
    (3, "development")

INSERT INTO role (id, j_title, d_id, salary)
VALUES
    (1, "tester", 5, 50000.00),
    (2, "Claims Reviewer", 6, 60000.00),
    (3, "SQL Developer", 7, 65000.00)