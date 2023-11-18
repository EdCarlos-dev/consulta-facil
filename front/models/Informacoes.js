const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db'); // Importe o objeto "sequelize" configurado

const Informacoes = sequelize.define('Informacoes', {
  rua: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rg: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

},{
  tableName: 'informacoes_pacientes',
});

// Sincronize a tabela com o banco de dados e aplique quaisquer alterações necessárias.
Informacoes.sync({ alter: true });

module.exports = Informacoes;