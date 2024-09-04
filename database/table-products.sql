\c user

CREATE TABLE Producto (
    code VARCHAR(25),
    name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0 CHECK (stock > 0),
    CONSTRAINT pk_code_Producto PRIMARY KEY (code)
);
