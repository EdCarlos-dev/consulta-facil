var mysql = require('mysql')
var dbConfig = require('dbconfig.js')

// Simule dados de entrada (substitua por seus próprios dados)
const nome = 'Paulo';
const email = 'paulo@email.com';
const senha = '4321';
const convenio = '12345'; // Número do convênio
const sus = '9876543210'; // Número do cartão SUS



// Conecte-se ao banco de dados
var con = mysql.createConnection(dbConfig);

// Chame o método insertPaciente para inserir o paciente no banco de dados
con.connect(function(error) {
  if(error) throw error;
  var sql = "insert into pacientes(nome, email senha, convenio, sus) values (?, ?, ?, ?, ?)";
  var values = [nome, email, senha, convenio, sus];
  
  con.query(sql, values, function(error,result){

  if (error) {
    console.error('Erro ao cadastrar paciente:', error);
  } else {
    console.log('Paciente cadastrado com sucesso!',result);
  }});
} );

  // Feche a conexão com o banco de dados, independentemente de haver erro ou sucesso
  con.end(function(error){
    if(error)throw error;
  });

