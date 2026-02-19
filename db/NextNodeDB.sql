Create database NextNodeDB
USE NextNodeDB
GO

CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);


INSERT INTO users (name, email)
VALUES 
('Brian', 'brian@email.com'),
('Edith', 'edith@email.com');

SELECT * FROM users;
