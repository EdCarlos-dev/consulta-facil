const { Sequelize } = require('sequelize');
 
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: '',
  password: '',
  database: '',
});
 
module.exports = sequelize;