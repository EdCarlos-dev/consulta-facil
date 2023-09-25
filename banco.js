var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "operador",
  password: "123456"
});

const dbConfig = require('./dbconfig'); // Importe as configurações do banco de dados

class Banco {}

  constructor() 
    this.connection = mysql.createConnection(dbConfig);
  


insertPaciente (nome, email, senha, convenio, sus, callback);
  const sql = `INSERT INTO pacientes (nome, email, senha, convenio, sus) VALUES (?, ?, ?, ?, ?)`;
  const values = [nome, email, senha, convenio, sus];

  this.connection.query(sql, values, function (err, result) {
    if (err) {
      console.error('Erro ao inserir paciente:', err);
      callback(err);
    } else {
      console.log('1 record inserted');
      callback(null, result);
    }
  });

  module.exports = dbConfig;
  
