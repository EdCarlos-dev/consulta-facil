const { DataTypes } = require('sequelize');
const sequelize = require('../../front/config/config');

// Defina o modelo de médico usando o Sequelize
const Medico = sequelize.define('Medico', {
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
    crm: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    especialidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
  },{
    tableName: 'medico',
  });

  module.exports = Medico;