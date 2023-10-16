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