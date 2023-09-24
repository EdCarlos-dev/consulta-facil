const mysql = require('mysql');
const dbConfig = require('./dbconfig'); // Importe as configurações do banco de dados

class Database {
  constructor() {
    this.connection = mysql.createConnection(dbConfig);
  }

  connect() {
    this.connection.connect(function (err) {
      if (err) throw err;
      console.log('Connected to the database!');
    });
  }

  insertPaciente(nome, email, senha, convenio, sus, callback) {
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
  }

  closeConnection() {
    this.connection.end(function (err) {
      if (err) throw err;
      console.log('Connection closed.');
    });
  }
}

module.exports = Database; // Exporte a classe Database diretamente
