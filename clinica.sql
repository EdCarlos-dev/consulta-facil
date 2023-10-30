USE clinica;
CREATE DATABASE IF NOT EXISTS clinica;

-- Crie uma tabela para armazenar informações de pacientes
CREATE TABLE IF NOT EXISTS pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    senha VARCHAR(255) NOT NULL,
    convenio INT(255) NOT NULL, 
    sus INT NOT NULL
);

-- Crie a tabela informacoes_pacientes
CREATE TABLE IF NOT EXISTS informacoes_pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rua VARCHAR(255) NOT NULL,
    numero INT NOT NULL,
    cep VARCHAR(255) NOT NULL,
    cidade VARCHAR(255) NOT NULL,
    estado VARCHAR(255) NOT NULL,
    rg VARCHAR(255) NOT NULL,
    cpf VARCHAR(255) NOT NULL,
    id_paciente INT NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES pacientes(id)
);

SELECT * FROM pacientes;
DROP TABLE IF EXISTS pacientes;

SELECT * FROM informacoes_pacientes;
DROP TABLE IF EXISTS informacoes_pacientes;

CREATE TABLE IF NOT EXISTS medico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    senha VARCHAR(250) NOT NULL,
    crm VARCHAR(13) NOT NULL,
    especialidade VARCHAR (50) NOT NULL
);

SELECT * FROM medico;
DROP TABLE IF EXISTS medico;


CREATE TABLE IF NOT EXISTS enfermeiro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    senha VARCHAR(250) NOT NULL,
    coren VARCHAR(13) NOT NULL
);

SELECT * FROM enfermeiro;
DROP TABLE IF EXISTS enfermeiro;

-- Crie uma tabela para armazenar informações de agendamentos de consultas
CREATE TABLE IF NOT EXISTS agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    data_consulta DATETIME NOT NULL,
    especialidade VARCHAR(255) NOT NULL,
    status ENUM('agendada', 'realizada', 'cancelada') NOT NULL DEFAULT 'agendada',
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);

SELECT * FROM agendamentos;

DROP TABLE IF EXISTS pacientes;
DROP DATABASE IF EXISTS clinica;

-- Crie uma tabela para armazenar informações de medicamentos
CREATE TABLE IF NOT EXISTS medicamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    dosagem VARCHAR(255) NOT NULL,
    intervalo VARCHAR(255) NOT NULL
);

-- Crie uma tabela para armazenar informações de receitas
CREATE TABLE IF NOT EXISTS receitas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    data_receita DATE NOT NULL,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);

-- Crie uma tabela de relacionamento para associar medicamentos a receitas
CREATE TABLE IF NOT EXISTS medicamentos_receitas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    receita_id INT NOT NULL,medico
    medicamento_id INT NOT NULL,
    FOREIGN KEY (receita_id) REFERENCES receitas(id),
    FOREIGN KEY (medicamento_id) REFERENCES medicamentos(id)
);
