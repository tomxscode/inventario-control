CREATE DATABASE inventario_control;
USE inventario_control;

CREATE TABLE categorias (
    id int AUTO_INCREMENT primary key,
    concepto varchar(128) unique not null,
    descripcion varchar(256) null
);

CREATE TABLE productos (
    sku varchar(32) primary key,
    detalle varchar(128) not null,
    descripcion varchar(256) null,
    existencias int default(0) not null
);

ALTER TABLE productos
ADD COLUMN categoria INT,
ADD CONSTRAINT fk_categoria
    FOREIGN KEY (categoria)
    REFERENCES categorias(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL;