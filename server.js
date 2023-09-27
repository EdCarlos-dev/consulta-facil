const express = require('express');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;

// Configure a conexão com o banco de dados
const sequelize = new Sequelize({
  dialect: 'mysql', // Substitua pelo seu banco de dados (por exemplo, postgres, sqlite, etc.)
  host: 'localhost', // Substitua pelo host do seu banco de dados
  username: 'root',
  password: '123456',
  database: 'clinica',
});

// Defina o modelo de usuário usando o Sequelize
const User = sequelize.define('User', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  convenio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sus: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Sincronize o modelo com o banco de dados e aplique quaisquer alterações necessárias
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Modelo sincronizado com o banco de dados.');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o modelo com o banco de dados:', error);
  });

// Middleware para processar dados de formulário
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware para servir arquivos estáticos, incluindo o CSS
app.use(express.static(path.join(__dirname, '/public')));

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

// Rota para a página medicamentos
app.get('/medicamentos', function(req, res) {
  // Você pode enviar um arquivo HTML como resposta ou renderizar uma página, dependendo da estrutura do seu projeto
  res.sendFile(__dirname + "/public/medicamentos.html");
});

// Rota para a página agendamentos
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

// Rota para requisição de novo login
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  // Valide as credenciais de login usando o Sequelize
  try {
    const usuario = await User.findOne({ where: { email } });

    if (usuario) {
      // Verifique a senha aqui e lide com a autenticação
      // ...
      res.json({ success: true, message: 'Autenticado com sucesso' });
    } else {
      res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
    }
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});

// Outras rotas e configurações...

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});
