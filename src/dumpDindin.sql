create database dindin;

create table usuarios (
    id serial primary key,
    nome text not null,
    email text not null unique,
    senha text not null
);

create table categorias (
    id serial primary key,
    descricao varchar(255) not null
);

create table transacoes (
    id serial primary key,
    descricao varchar(255) not null,
    valor decimal(10) not null,
    data timestamp default now() not null,
    categoria_id integer references categorias(id),
    usuario_id integer references usuarios(id),
    tipo text not null
);
