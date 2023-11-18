const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const Medico = db.define('medico', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING, // Correção: use DataTypes.STRING para texto
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING, // Correção: use DataTypes.STRING para texto
    allowNull: false,
    unique: true, // Correção: unique, não VARCHARUNIQUE
  },
  senha: {
    type: DataTypes.STRING, // Correção: use DataTypes.STRING para texto
    allowNull: false,
  },
  CRM: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  especialidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sincronize a tabela com o banco de dados e aplique quaisquer alterações necessárias.
Medico.sync({ alter: true });

module.exports = Medico;
