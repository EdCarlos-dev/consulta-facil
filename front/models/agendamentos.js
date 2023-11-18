const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

// Defina o modelo de agendamentos usando o Sequelize
const Agendamento = sequelize.define('Agendamento', {
    paciente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_consulta: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    especialidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('agendada', 'realizada', 'cancelada'),
      defaultValue: 'agendada',
      allowNull: false,
    },
  }, {
    tableName: 'agendamentos',
  });

  document.addEventListener("DOMContentLoaded", function () {
    const listaAgendamentos = document.getElementById('lista-agendamentos');
  
    // Aqui você pode fazer uma solicitação para o servidor para obter a lista de agendamentos
    // Certifique-se de que o servidor tenha uma rota para fornecer esses dados.
  
    // Suponha que você tenha uma função para buscar os agendamentos do banco de dados
    fetch('/obter-agendamentos')
      .then((response) => response.json())
      .then((data) => {
        const agendamentos = data.agendamentos;

         // Limpe a lista de agendamentos antes de adicionar os novos
        listaAgendamentos.innerHTML = '';
  
        // Itere sobre os agendamentos e crie elementos <li> para exibi-los na página
        agendamentos.forEach((agendamento) => {
          const li = document.createElement('li');
          li.textContent = `ID: ${agendamento.id}, Paciente ID: ${agendamento.paciente_id}, Data da Consulta: ${agendamento.data_consulta}, Especialidade: ${agendamento.especialidade}, Status: ${agendamento.status}`;
          listaAgendamentos.appendChild(li);
        });
      })
      .catch((error) => {
        console.error('Erro ao obter agendamentos:', error);
      });
  });