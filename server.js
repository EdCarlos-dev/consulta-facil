const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql'); // Importe o módulo do MySQL
const path = require('path'); // Importe o módulo 'path' para manipular caminhos de arquivos
const app = express();
const port = 3000;

// Middleware para processar dados de formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware para servir arquivos estáticos, incluindo o CSS
app.use(express.static(path.join(__dirname, '/public/style.css')));

// Configure o Express para servir arquivos estáticos na pasta "public"

app.use(express.static('public'));

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'operador',
  password: '123456',
  database: 'clinica', // Nome do banco de dados que você criou
});

// Conecte-se ao banco de dados MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Função para consultar um paciente no banco de dados por email (simulada)
async function consultarPacientePorEmail(email) {
  // Implemente a lógica real para consultar o paciente no banco de dados
  // e retorne o paciente encontrado ou null se não existir.
  // Você pode usar uma biblioteca de banco de dados, como o Sequelize, para essa tarefa.
  return null; // Simulando que o paciente não foi encontrado.
}

// Função para validar as credenciais do paciente
async function validarCredenciais(email, senha) {
  const paciente = await consultarPacientePorEmail(email);
  if (!paciente) {
    return null; // Email não encontrado no banco de dados.
  }

  const senhaValida = await bcrypt.compare(senha, paciente.senha);
  if (!senhaValida) {
    return null; // Senha incorreta.
  }

  return paciente;
}

// Rota para a página inicial

app.get('/', function(req, res) {

  // Você pode enviar um arquivo HTML como resposta ou renderizar uma página, dependendo da estrutura do seu projeto

  res.sendFile(__dirname + "/public/index.html");

});

// Rota para a página login

app.get('/login', function(req, res) {

  // Você pode enviar um arquivo HTML como resposta ou renderizar uma página, dependendo da estrutura do seu projeto

  res.sendFile(__dirname + "/public/login.html");

});

// Rota para a página cadastro

app.get('/cadastro', function(req, res) {

  // Você pode enviar um arquivo HTML como resposta ou renderizar uma página, dependendo da estrutura do seu projeto

  res.sendFile(__dirname + "/public/cadastro.html");

});

// Rota para a página esqueci senha

app.get('/recuperar-senha', function(req, res) {

  // Você pode enviar um arquivo HTML como resposta ou renderizar uma página, dependendo da estrutura do seu projeto

  res.sendFile(__dirname + "/public/recuperar-senha.html");

});

// Rota para a página busca

app.get('/busca', function(req, res) {

  // Você pode enviar um arquivo HTML como resposta ou renderizar uma página, dependendo da estrutura do seu projeto

  res.sendFile(__dirname + "/public/busca.html");

});

// Rota para receber solicitações de login
app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;

  // Valide as credenciais usando a função validarCredenciais.
  const pacienteAutenticado = await validarCredenciais(email, senha);

  if (pacienteAutenticado) {
    // Credenciais válidas: autenticação bem-sucedida.
    res.json({ success: true, paciente: pacienteAutenticado });
  } else {
    // Credenciais inválidas: autenticação falhou.
    res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
  }
});

// Outras rotas e configurações...

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});
