use clinica;
create database clinica;

-- Crie uma tabela para armazenar informações de pacientes
CREATE TABLE pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- Crie uma tabela para armazenar informações de medicamentos
CREATE TABLE medicamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  dosagem VARCHAR(255) NOT NULL,
  intervalo VARCHAR(255) NOT NULL
);

-- Crie uma tabela para armazenar informações de receitas
CREATE TABLE receitas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paciente_id INT NOT NULL,
  data_receita DATE NOT NULL,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);

-- Crie uma tabela de relacionamento para associar medicamentos a receitas
CREATE TABLE medicamentos_receitas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  receita_id INT NOT NULL,
  medicamento_id INT NOT NULL,
  FOREIGN KEY (receita_id) REFERENCES receitas(id),
  FOREIGN KEY (medicamento_id) REFERENCES medicamentos(id)
);

CREATE TABLE medico (
id int auto_increment primary key,
nome varchar (250) not null,
email varchar (250) not null,
senha varchar (250) not null,
crm varchar (13) not null,
especialidade varchar (50) not null
);

select * from pacientes; 

