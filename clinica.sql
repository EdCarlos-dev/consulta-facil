USE clinica;
CREATE DATABASE IF NOT EXISTS clinica;

-- Crie uma tabela para armazenar informações de pacientes
CREATE TABLE IF NOT EXISTS pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    convenio VARCHAR(255) NOT NULL, -- Alterado para VARCHAR(255)
    sus INT NOT NULL
);

SELECT * FROM pacientes;

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
    receita_id INT NOT NULL,
    medicamento_id INT NOT NULL,
    FOREIGN KEY (receita_id) REFERENCES receitas(id),
    FOREIGN KEY (medicamento_id) REFERENCES medicamentos(id)
);

CREATE TABLE IF NOT EXISTS medico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    senha VARCHAR(250) NOT NULL,
    crm VARCHAR(13) NOT NULL,
    especialidade VARCHAR(50) NOT NULL
);

SELECT * FROM medico;

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

DROP TABLE IF EXISTS users;
DROP DATABASE IF EXISTS clinica;



