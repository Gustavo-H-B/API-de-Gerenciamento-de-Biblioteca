DROP DATABASE IF EXISTS biblioteca;

CREATE DATABASE biblioteca;
USE biblioteca;

CREATE TABLE livros (
	id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    isbn VARCHAR(20) NOT NULL UNIQUE,
    ano_publicado SMALLINT NOT NULL,
    numero_paginas INT NOT NULL,
    sinopse TEXT
);

CREATE TABLE generos (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE autores (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(150) NOT NULL,
    nacionalidade VARCHAR(80) NOT NULL,
    data_nascimento DATE
);

CREATE TABLE usuarios (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(150) NOT NULL,
    cpf VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
	telefone VARCHAR(20) UNIQUE,
    data_nascimento DATE
);

CREATE TABLE livros_genero (
	id_livro INT,
    id_genero INT,
	CONSTRAINT fk_livros_genero_livro FOREIGN KEY (id_livro) REFERENCES livros (id) ON DELETE CASCADE,
    CONSTRAINT fk_livros_genero_genero FOREIGN KEY (id_genero) REFERENCES generos (id) ON DELETE CASCADE
);

CREATE TABLE autores_livros (
id_autor INT,
id_livro INT,
CONSTRAINT fk_autores_livros_autor FOREIGN KEY (id_autor) REFERENCES autores (id) ON DELETE CASCADE,
CONSTRAINT fk_autores_livros_livro FOREIGN KEY (id_livro) REFERENCES livros (id) ON DELETE CASCADE
);

CREATE TABLE emprestimos (
	id INT AUTO_INCREMENT PRIMARY KEY,
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE NOT NULL,
    id_livro INT NOT NULL,
    id_usuario INT NOT NULL,
    CONSTRAINT fk_emprestimos_livro FOREIGN KEY (id_livro) REFERENCES livros (id) ON DELETE RESTRICT,
    CONSTRAINT fk_emprestimos_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios (id) ON DELETE RESTRICT
);

INSERT INTO generos (nome) VALUES
('Ficção Não Tão Científica'),
('Terror de Boleto Atrasado'),
('Romance com Mico em Público'),
('Autoajuda para Mágicos Falidos'),
('Suspense do Cachorro Latindo à Meia-Noite');

INSERT INTO autores (nome_completo, nacionalidade, data_nascimento) VALUES
('Machado de Cimento', 'Brasileira', '1839-06-21'),
('J.K. Rola-Rola', 'Britânica', '1965-07-31'),
('George Orelha', 'Britânica', '1903-06-25'),
('Stephen O-Brabo', 'Norte-Americana', '1947-09-21'),
('Ágata Cristaleira', 'Britânica', '1890-09-15');

INSERT INTO livros (titulo, isbn, ano_publicado, numero_paginas, sinopse) VALUES
('Dom Casmurro e o Visto no Zap', '978-85-0001-01', 1899, 250, 'Bentinho enlouquece tentando descobrir por que Capitu visualizou a mensagem e não respondeu há 3 dias.'),
('Harry Porco e a Coxinha Filosofal', '978-85-0001-02', 1997, 310, 'Um garoto descobre que é bruxo e usa magia proibida apenas para conseguir coxinha grátis no Recreio.'),
('1984: O Ano do Wi-Fi Lento', '978-85-0001-03', 1949, 328, 'O Grande Irmão controla a sociedade limitando a velocidade da internet a 512kbps.'),
('O Iluminado pelo Farol do Carro', '978-85-0001-04', 1977, 440, 'Um escritor passa a noite aterrorizado num hotel isolado porque esqueceu a luz do carro ligada e a bateria descarregou.'),
('O Mistério dos 10 Boletos Sem Pagar', '978-85-0001-05', 1939, 220, 'Uma história aterrorizante onde os personagens somem um a um após receberem notificações do Serasa.');

INSERT INTO usuarios (nome_completo, cpf, email, telefone, data_nascimento) VALUES
('Chaves do Oito', '111.222.333-01', 'chaves@vilas.com', '(11) 91111-1111', '1971-06-20'),
('Seu Madruga da Silva', '222.333.444-02', 'devendo14meses@aluguel.com', '(11) 92222-2222', '1923-09-02'),
('Agostinho Carrara', '333.444.555-03', 'carrara_taxi@br.com', '(21) 93333-3333', '1965-04-12'),
('Goku da Silva', '444.555.666-04', 'kamehameha@dbz.com', '(11) 94444-4444', '1984-04-26');

INSERT INTO livros_genero (id_livro, id_genero) VALUES
(1, 3),
(2, 4),
(3, 1),
(4, 2),
(5, 5);

INSERT INTO autores_livros (id_autor, id_livro) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

INSERT INTO emprestimos (data_emprestimo, data_devolucao, id_livro, id_usuario) VALUES
('2026-09-01', '2026-09-15', 1, 3),
('2026-09-10', '2026-09-24', 2, 1),
('2026-09-15', '2026-09-29', 5, 2);