const { DataTypes } = require('sequelize');
const sequelize = require('../../front/config/config');
const Pacientes = require('./Paciente'); // Importe o modelo de Pacientes
const Enfermeiro = require('./Enfermeiro'); // Importe o modelo de Enfermeiro
const Agendamentos = require('./Agendamentos'); // Importe o modelo de Agendamentos

// Defina o modelo de triagemEnfermeiro usando o Sequelize
const TriagemEnfermeiro = sequelize.define('TriagemEnfermeiro', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    paciente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pacientes,
        key: 'id',
      },
    },
    enfermeiro_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Enfermeiro,
        key: 'id',
      },
    },
    agendamento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Agendamentos,
        key: 'id',
      },
    },
    data_triagem: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // Adicione mais campos conforme necessário
  }, {
    tableName: 'triagem_enfermeiro',
    indexes: [
      {
        name: 'idx_data_triagem',
        fields: ['data_triagem'],
      },
    ],
  });

module.exports = TriagemEnfermeiro;