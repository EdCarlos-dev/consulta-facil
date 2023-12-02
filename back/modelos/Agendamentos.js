const { DataTypes } = require('sequelize');
const sequelize = require('../../front/config/config');
const Paciente = require('../../back/modelos/Paciente');

// Defina o modelo de agendamentos usando o Sequelize
const Agendamentos = sequelize.define('Agendamentos', {
    paciente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nome_paciente:{
      type: DataTypes.STRING,
      allowNull: true,
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
    comentarios: {
      type: DataTypes.TEXT, 
    },
  }, 
  {
    tableName: 'agendamentos',
  });

  Agendamentos.belongsTo(Paciente, { foreignKey: 'paciente_id' });

module.exports = Agendamentos;