var mysql = require('mysql')
var dbConfig = require('dbconfig.js')

// Conecte-se ao banco de dados
var con = mysql.createConnection(dbConfig);

// Chame o método insertPaciente para inserir o paciente no banco de dados
con.connect(function(error) {
  if(error) throw error;
  var sql = "insert into enfermeiro(nome, email, senha, confirmar-senha, coren) values (?, ?, ?, ?, ?)";
  var values = [nome, email, senha, confirmar-senha, coren];
  
  con.query(sql, values, function (error, result) {
    if (error) {
      console.error('Erro ao cadastrar enfermeiro:', error);
    } else {
      console.log('Enfermeiro cadastrado com sucesso!', result);

      // Após o cadastro bem-sucedido, redirecione para a página de login do enfermeiro
setTimeout(function () {
  window.location.href = '/public/loginEnfermeiro.html'; // Redirecionar para a página de loginEnfermeiro.html
}, 2000); // Redirecionar após 2 segundos
    }
  });
});

