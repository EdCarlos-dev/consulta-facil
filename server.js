const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

// Middleware para processar dados de formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota para a página inicial
app.get('/login.js', (req, res) => {
  // Você pode enviar um arquivo HTML como resposta ou renderizar uma página, dependendo da estrutura do seu projeto
  res.send('<h1>Bem-vindo à Clínica Easy Way</h1>');
  res.send ('<header><h1>Clínica Easy Way</h1>')
});

// Rota para receber solicitações de login
app.post('/login.js', (req, res) => {
  // Lógica de autenticação aqui...
});

// Outras rotas e configurações...

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});
