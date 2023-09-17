create database clinica;

use clinica;

-- Criação da tabela "usuarios"
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

-- Criação da tabela "medicamentos"
CREATE TABLE medicamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  dosagem VARCHAR(255) NOT NULL,
  intervalo VARCHAR(255) NOT NULL
);

-- Criação da tabela "receitas"
CREATE TABLE receitas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  data_receita DATE NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Criação da tabela de relacionamento "medicamentos_receitas"
CREATE TABLE medicamentos_receitas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  receita_id INT NOT NULL,
  medicamento_id INT NOT NULL,
  FOREIGN KEY (receita_id) REFERENCES receitas(id),
  FOREIGN KEY (medicamento_id) REFERENCES medicamentos(id)
);
