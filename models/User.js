const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const User = db.define('pacientes', {
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
User.sync({ alter: true });

module.exports = User;
