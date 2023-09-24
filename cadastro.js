const Database = require('./database'); // Importe a classe Database

// Simule dados de entrada (substitua por seus próprios dados)
const nome = 'Paulo';
const email = 'paulo@email.com';
const senha = '4321';
const convenio = '12345'; // Número do convênio
const sus = '9876543210'; // Número do cartão SUS

// Crie uma instância da classe Database
const db = new Database();

// Conecte-se ao banco de dados
db.connect();

// Chame o método insertPaciente para inserir o paciente no banco de dados
db.insertPaciente(nome, email, senha, convenio, sus, (error) => {
  if (error) {
    console.error('Erro ao cadastrar paciente:', error);
  } else {
    console.log('Paciente cadastrado com sucesso!');
  }

  // Feche a conexão com o banco de dados, independentemente de haver erro ou sucesso
  db.closeConnection();
});
