DROP DATABASE IF EXISTS biblioteca;

CREATE DATABASE biblioteca;
USE biblioteca;

CREATE TABLE livros (
	id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    isbn VARCHAR(20) NOT NULL,
    ano_publicado YEAR NOT NULL,
    numero_paginas INT NOT NULL,
    sinopse TEXT
);

CREATE TABLE livros_genero (
	id_livro int,
    id_genero int,
	CONSTRAINT fk_id_livro FOREIGN KEY (id_livro) REFERENCES livros (id) ON DELETE CASCADE,
    CONSTRAINT fk_id_genero FOREIGN KEY (id_genero) REFERENCES generos (id) ON DELETE CASCADE
);

CREATE TABLE generos (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80) not null
);

CREATE TABLE autores_livros (

);

CREATE TABLE autores (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(150) NOT NULL,
    nacionalidade VARCHAR(80) NOT NULL,
    data_nascimento DATE
);

CREATE TABLE emprestimos (
	id INT AUTO_INCREMENT PRIMARY KEY,
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE NOT NULL
);

CREATE TABLE usuarios (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(150) NOT NULL,
    cpf VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
	telefone VARCHAR(20) UNIQUE,
    data_nascimento DATE
);

INSERT INTO livros 
(titulo, genero, autor)
values ('a', 'a', 'a');

SELECT * FROM livros;