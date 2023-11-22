const { DataTypes } = require('sequelize');
const sequelize = require('../../front/config/config');

// Defina o modelo de enfermeiro usando o Sequelize
const Enfermeiro = sequelize.define('Enfermeiro', {
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
    coren: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  
  },{
    tableName: 'enfermeiro',
  });

  module.exports = Enfermeiro;