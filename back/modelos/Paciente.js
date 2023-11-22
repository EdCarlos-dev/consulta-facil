const { DataTypes } = require('sequelize');
const sequelize = require('../../front/config/config');

// Defina o modelo do paciente usando o Sequelize
const Paciente = sequelize.define('Paciente', {
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
}, {
  tableName: 'pacientes',
});

module.exports = Paciente;
