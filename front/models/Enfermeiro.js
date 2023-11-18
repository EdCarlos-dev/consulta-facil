const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const Enfermeiro = db.define('enfermeiro', {
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
  coren: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Sincronize a tabela com o banco de dados e aplique quaisquer alterações necessárias.
Enfermeiro.sync({ alter: true });

module.exports = Enfermeiro;
