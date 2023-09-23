var mysql = require('mysql');

class Database {
  constructor() {
    this.con = mysql.createConnection({
      host: "localhost:3306",
      user: "operador",
      password: "123456",
      database: "clinica"
    });
  }

  connect() {
    this.con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
  }

  insertPaciente(name, address) {
    var sql = `INSERT INTO pacientes (nome, email, senha) VALUES ('${nome}', '${email}', ${senha})`;
    this.con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  }

  closeConnection() {
    this.con.end(function(err) {
      if (err) throw err;
      console.log("Connection closed.");
    });
  }
}


