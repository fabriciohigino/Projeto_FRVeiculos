select * from veiculos;

INSERT INTO veiculos (nome, marca, ano, placa, preco, cidade, usuario_id) VALUES
('Civic', 'Honda', 2018, 'ABC1234', 85000.00, 'São Paulo', 1),
('Corolla', 'Toyota', 2020, 'DEF5678', 98000.50, 'Rio de Janeiro', 2),
('Gol', 'Volkswagen', 2016, 'GHI9012', 32000.00, 'Curitiba', 3),
('Onix', 'Chevrolet', 2019, 'JKL3456', 55000.00, 'Belo Horizonte', 4),
('HB20', 'Hyundai', 2021, 'MNO7890', 69000.99, 'Fortaleza', 5),
('EcoSport', 'Ford', 2017, 'PQR1234', 48000.00, 'Recife', 6),
('Tracker', 'Chevrolet', 2022, 'STU5678', 102000.00, 'Salvador', 7),
('Polo', 'Volkswagen', 2018, 'VWX9012', 72000.00, 'Porto Alegre', 8),
('Renegade', 'Jeep', 2021, 'YZA3456', 115000.75, 'Brasília', 9),
('Compass', 'Jeep', 2023, 'BCD7890', 150000.00, 'Campinas', 10),
('Sandero', 'Renault', 2015, 'EFG1234', 29000.00, 'Maceió', 1),
('Kwid', 'Renault', 2022, 'HIJ5678', 55000.00, 'Natal', 2),
('Strada', 'Fiat', 2020, 'KLM9012', 80000.00, 'Manaus', 3),
('Toro', 'Fiat', 2023, 'NOP3456', 135000.00, 'Belém', 4),
('Uno', 'Fiat', 2014, 'QRS7890', 25000.00, 'João Pessoa', 5),
('Hilux', 'Toyota', 2019, 'TUV1234', 190000.00, 'Florianópolis', 6),
('S10', 'Chevrolet', 2021, 'WXY5678', 140000.00, 'Goiânia', 7),
('HR-V', 'Honda', 2018, 'ZAB9012', 96000.00, 'Vitória', 8),
('T-Cross', 'Volkswagen', 2020, 'CDE3456', 110000.00, 'Ribeirão Preto', 9),
('Fiesta', 'Ford', 2016, 'FGH7890', 35000.00, 'São Luís', 10);

select * from usuario;


ALTER TABLE veiculos 
DROP CONSTRAINT IF EXISTS fkqpfg94cnwvi1w19fmawocgmm9;

ALTER TABLE veiculos 
ADD CONSTRAINT fk_usuario 
FOREIGN KEY (usuario_id) REFERENCES usuario(id) 
ON DELETE SET NULL;
