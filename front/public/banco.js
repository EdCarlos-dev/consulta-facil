const mysql = require('mysql');
const dbConfig = require('./dbconfig'); // Importe as configurações do banco de dados

class Banco {
  constructor() {
    this.connection = mysql.createConnection(dbConfig);
  }

  connect() {
    this.connection.connect((err) => {
      if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        throw err;
      }
      console.log('Conectado ao banco de dados!');
    });
  }

  insertPaciente(nome, email, senha, convenio, sus, callback) {
    const sql = `INSERT INTO pacientes (nome, email, senha, convenio, sus) VALUES (?, ?, ?, ?, ?)`;
    const values = [nome, email, senha, convenio, sus];

    this.connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Erro ao inserir paciente:', err);
        callback(err, null);
      } else {
        console.log('Registro inserido com sucesso');
        callback(null, result);
      }
    });
  }

  closeConnection() {
    this.connection.end((err) => {
      if (err) {
        console.error('Erro ao fechar a conexão com o banco de dados:', err);
        throw err;
      }
      console.log('Conexão fechada.');
    });
  }
}

module.exports = new Banco(); // Exporte uma instância única do Banco

