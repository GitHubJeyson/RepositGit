CREATE DATABASE bd_sistemapedidos;


CREATE TABLE Productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    imagen VARCHAR(255),
    nombre VARCHAR(100),
    descripcion TEXT,
    precio DECIMAL(10, 2),
    estado ENUM('disponible', 'agotado') DEFAULT 'disponible'
);
