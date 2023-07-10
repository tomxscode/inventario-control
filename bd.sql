CREATE DATABASE inventario_control;
USE inventario_control;

CREATE TABLE productos (
    sku varchar(32) primary key,
    detalle varchar(128) not null,
    descripcion varchar(256) null,
    existencias int default(0) not null
)