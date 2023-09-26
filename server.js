const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
const path = require('path'); // Importe o módulo 'path' para manipular caminhos de arquivos
const app = express();
const port = 3000;

// Middleware para processar dados de formulário
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

// Middleware para servir arquivos estáticos, incluindo o CSS
app.use(express.static(path.join(__dirname, '/public/style.css')));

// Configure o Express para servir arquivos estáticos na pasta "public"

app.use(express.static('public'));

// Rota para a página inicial

app.get('/', function(req, res) {

  // Você pode enviar um arquivo HTML como resposta ou renderizar uma página, dependendo da estrutura do seu projeto

  res.sendFile(__dirname + "/public/index.html");

});

// Rota para a página cadastro

app.get('/cadastro', function(req, res) {

  // Você pode enviar um arquivo HTML como resposta ou renderizar uma página, dependendo da estrutura do seu projeto

  res.sendFile(__dirname + "/public/cadastro.html");

});



// Rota para a página cadastro

app.get('/cadastro-medico', function(req, res) {

  // Você pode enviar um arquivo HTML como resposta ou renderizar uma página, dependendo da estrutura do seu projeto

  res.sendFile(__dirname + "/public/cadastromedico.html");

});


// Rota para a página login

app.get('/login', function(req, res) {

  // Você pode enviar um arquivo HTML como resposta ou renderizar uma página, dependendo da estrutura do seu projeto

  res.sendFile(__dirname + "/public/login.html");

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

// Rota para a página busca

app.get('/medicamentos', function(req, res) {

  // Você pode enviar um arquivo HTML como resposta ou renderizar uma página, dependendo da estrutura do seu projeto

  res.sendFile(__dirname + "/public/medicamentos.html");

});

// Rota para a página busca

app.get('/agendamentos', function(req, res) {

  // Você pode enviar um arquivo HTML como resposta ou renderizar uma página, dependendo da estrutura do seu projeto

  res.sendFile(__dirname + "/public/agendamentos.html");

});

// Rota para a Marcar consulta

app.get('/marcar-consulta', function(req, res) {

  // Você pode enviar um arquivo HTML como resposta ou renderizar uma página, dependendo da estrutura do seu projeto

  res.sendFile(__dirname + "/public/marcarconsulta.html");

});

// Rota para a Perfil Paciente

app.get('/perfilPaciente', function(req, res) {

  // Você pode enviar um arquivo HTML como resposta ou renderizar uma página, dependendo da estrutura do seu projeto

  res.sendFile(__dirname + "/public/perfilPaciente.html");

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
