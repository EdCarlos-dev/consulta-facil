const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const Paciente = db.define('Paciente', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  convenio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sus: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Sincronize a tabela com o banco de dados e aplique quaisquer alterações necessárias.
Paciente.sync({ alter: true });

module.exports = Paciente;
