var mysql = require('mysql')
var dbConfig = require('dbconfig.js')

// Conecte-se ao banco de dados
var con = mysql.createConnection(dbConfig);

// Chame o método insertPaciente para inserir o paciente no banco de dados
con.connect(function(error) {
  if(error) throw error;
  var sql = "insert into pacientes(nome, email senha, convenio, sus) values (?, ?, ?, ?, ?)";
  var values = [nome, email, senha, convenio, sus];
  
  con.query(sql, values, function (error, result) {
    if (error) {
      console.error('Erro ao cadastrar paciente:', error);
    } else {
      console.log('Paciente cadastrado com sucesso!', result);

      // Após o cadastro bem-sucedido, redirecione para a página de login
setTimeout(function () {
  window.location.href = 'login.html'; // Redirecionar para a página de login.html
}, 2000); // Redirecionar após 2 segundos
    }
  });
});



