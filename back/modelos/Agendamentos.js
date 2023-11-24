const { DataTypes } = require('sequelize');
const sequelize = require('../../front/config/config');

// Defina o modelo de agendamentos usando o Sequelize
const Agendamentos = sequelize.define('Agendamentos', {
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

  module.exports = Agendamentos;