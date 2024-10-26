CREATE TABLE usuario (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(10) CHECK (tipo IN ('ADMIN', 'COMUM')) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cidade VARCHAR(50)
);

CREATE TABLE veiculos (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    ano INT NOT NULL,
    placa VARCHAR(10) UNIQUE NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    cidade VARCHAR(50),
    usuario_id INT REFERENCES usuario(id) ON DELETE SET NULL
);

alter table carro rename to veiculos;

select * from veiculos;

CREATE TABLE relatorio (
    id BIGSERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    data_geracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_id INT REFERENCES usuario(id) ON DELETE CASCADE
);


INSERT INTO usuario (nome, email, senha, tipo, cidade) VALUES
('Christopher Marsh', 'bob36@wyatt.net', '4711a2c04efbb90c1b34fffe4b149b06618e8e848f81019359319689357a17a1', 'COMUM', 'Fortaleza'),
('Daniel Roberts', 'johnsonjames@hodge-cox.com', '4711a2c04efbb90c1b34fffe4b149b06618e8e848f81019359319689357a17a1', 'COMUM', 'Pacujá'),
('Nicole Abbott', 'luceroerica@moore.com', '4711a2c04efbb90c1b34fffe4b149b06618e8e848f81019359319689357a17a1', 'COMUM', 'Caucaia'),
('Peter Chan', 'jonathon25@gmail.com', '4711a2c04efbb90c1b34fffe4b149b06618e8e848f81019359319689357a17a1', 'COMUM', 'Pacujá'),
('Jennifer Mendoza', 'carolmyers@flores-mclean.info', '4711a2c04efbb90c1b34fffe4b149b06618e8e848f81019359319689357a17a1', 'COMUM', 'Caucaia'),
('Kimberly Blair', 'alexisnewton@hotmail.com', '4711a2c04efbb90c1b34fffe4b149b06618e8e848f81019359319689357a17a1', 'COMUM', 'Caucaia'),
('Mario Smith', 'allenjamie@miller.org', '4711a2c04efbb90c1b34fffe4b149b06618e8e848f81019359319689357a17a1', 'COMUM', 'Caucaia'),
('Amara Buckley', 'millergregory@yahoo.com', '4711a2c04efbb90c1b34fffe4b149b06618e8e848f81019359319689357a17a1', 'COMUM', 'Fortaleza'),
('April Brown', 'xmcdaniel@yahoo.com', '4711a2c04efbb90c1b34fffe4b149b06618e8e848f81019359319689357a17a1', 'COMUM', 'Maracanaú'),
('Kaitlyn Pope', 'andrew52@gmail.com', '4711a2c04efbb90c1b34fffe4b149b06618e8e848f81019359319689357a17a1', 'COMUM', 'Maracanaú'),
('Amelia Martinez', 'ashlee84@smith-white.net', '4711a2c04efbb90c1b34fffe4b149b06618e8e848f81019359319689357a17a1', 'ADMIN', 'Maranguape'),
('Lisa Singleton', 'nelsonmary@hotmail.com', '4711a2c04efbb90c1b34fffe4b149b06618e8e848f81019359319689357a17a1', 'ADMIN', 'Maracanaú'),
('James Conley', 'elizabethpeterson@romero.com', '4711a2c04efbb90c1b34fffe4b149b06618e8e848f81019359319689357a17a1', 'ADMIN', 'Fortaleza'),
('Shelby Erickson', 'jerry78@smith-cooper.com', '4711a2c04efbb90c1b34fffe4b149b06618e8e848f81019359319689357a17a1', 'ADMIN', 'Maranguape'),
('Brian Lopez', 'kathleen06@hotmail.com', '4711a2c04efbb90c1b34fffe4b149b06618e8e848f81019359319689357a17a1', 'ADMIN', 'Itapipoca'),
('Brenda Hutchinson', 'kylebauer@richardson.com', '4711a2c04efbb90c1b34fffe4b149b06618e8e848f81019359319689357a17a1', 'ADMIN', 'Maranguape'),
('Scott Rogers', 'shampton@clarke.net', '4711a2c04efbb90c1b34fffe4b149b06618e8e848f81019359319689357a17a1', 'ADMIN', 'Itapipoca'),
('Adam Rodriguez', 'smithtimothy@harper-white.info', '4711a2c04efbb90c1b34fffe4b149b06618e8e848f81019359319689357a17a1', 'ADMIN', 'Fortaleza'),
('Whitney Boyd', 'christopher32@wheeler.biz', '4711a2c04efbb90c1b34fffe4b149b06618e8e848f81019359319689357a17a1', 'ADMIN', 'Itapipoca'),
('James Castro', 'jonathan61@yahoo.com', '4711a2c04efbb90c1b34fffe4b149b06618e8e848f81019359319689357a17a1', 'ADMIN', 'Fortaleza');



