create database ventas;
use ventas;

create table producto(
id int(11) not null auto_increment,
nombre varchar(45) not null,
marca varchar(45) not null,
hechoen varchar(45) not null,
precio float not null,
primary key (id)
) engine=InnoDB default charset=utf8;

insert into ventas.producto(nombre, marca, hechoen, precio) values ('Cámara Web', 'AverMedia', 'México', 2200);
insert into ventas.producto(nombre, marca, hechoen, precio) values ('Mouse', 'Logitech', 'USA', 250);
insert into ventas.producto(nombre, marca, hechoen, precio) values ('Teclado', 'VoIP', 'Korea', 500);
insert into ventas.producto(nombre, marca, hechoen, precio) values ('Micrófono', 'Zax Sound', 'China', 1000);
insert into ventas.producto(nombre, marca, hechoen, precio) values ('Micrófono', 'Zax', 'Japon', 700);