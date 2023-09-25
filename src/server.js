require('dotenv').config({path:'variaveis.env'});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));

server.use('/api', routes);

server.listen(process.env.PORT, ()=>{
  console.log('Servidor rodando em: http://localhost:${process.env.PORT}');
})

const bcrypt = require('bcrypt');
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




