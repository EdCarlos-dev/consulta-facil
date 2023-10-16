const express = require('express');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

// Configure a conexão com o banco de dados
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '123456',
  database: 'clinica',
});

// Defina o modelo de paciente usando o Sequelize
const Paciente = sequelize.define('Paciente', {
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

},{
  tableName: 'pacientes',
});

// Defina o modelo de médico usando o Sequelize
const Medico = sequelize.define('Medico', {
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

},{
  tableName: 'medico',
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para servir arquivos estáticos, incluindo o CSS
app.use(express.static(path.join(__dirname, '/public')));

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Rota para a página de cadastro
app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/cadastro.html'));
});

// Rota para a página de cadastro médico
app.get('/cadastro-medico', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/cadastromedico.html'));
});

// Rota para a página de login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/login.html'));
});

// Rota para a página de recuperação de senha
app.get('/recuperar-senha', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/recuperar-senha.html'));
});

// Rota para a página de busca
app.get('/busca', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/busca.html'));
});

// Rota para a página de medicamentos
app.get('/medicamentos', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/medicamentos.html'));
});

// Rota para a página de agendamentos
app.get('/agendamentos', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/agendamentos.html'));
});

// Rota para a página de marcar consulta
app.get('/marcar-consulta', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/marcarconsulta.html'));
});

// Rota para a página de perfil do paciente
app.get('/perfilPaciente', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/perfilPaciente.html'));
});

// Rota para a requisição de novo cadastro de paciente
app.post("/cadastrar-paciente", async (req, res) => {
  try {
    const { nome, email, senha, convenio, sus, concordouCheckbox } = req.body;

    // Faça as validações necessárias antes de criar o paciente

    // Crie o paciente com os dados extraídos
    const novoPaciente = await Paciente.create({
      nome,
      email,
      senha,
      convenio,
      sus,
      concordou: concordouCheckbox === 'on', // checkbox é enviado apenas se marcado
    });

    return res.json({
      erro: false,
      mensagem: "Cadastro efetuado com sucesso",
      usuario: novoPaciente,
    });
  } catch (error) {
    console.error("Erro ao cadastrar paciente:", error);

    // Mantenha mensagens de erro consistentes
    return res.status(400).json({
      erro: true,
      mensagem: "Erro ao cadastrar paciente. Verifique os dados e tente novamente.",
    });
  }
});

// Rota para a requisição de novo cadastro de medico
app.post("/cadastrar-medico", async (req, res) => {
  try {
    const { nome, email, senha, convenio, sus, concordouCheckbox } = req.body;

    // Faça as validações necessárias antes de criar o paciente

    // Crie o paciente com os dados extraídos
    const novoMedico = await Medico.create({
      nome,
      email,
      senha,
      convenio,
      sus,
      concordou: concordouCheckbox === 'on', // checkbox é enviado apenas se marcado
    });

    return res.json({
      erro: false,
      mensagem: "Cadastro efetuado com sucesso",
      usuario: novoMedico,
    });
  } catch (error) {
    console.error("Erro ao cadastrar médico:", error);

    // Mantenha mensagens de erro consistentes
    return res.status(400).json({
      erro: true,
      mensagem: "Erro ao cadastrar médico. Verifique os dados e tente novamente.",
    });
  }
});


// Rota para a requisição de login
app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Procurar o paciente no banco de dados pelo email
    const paciente = await Paciente.findOne({
      where: { email },
    });

    // Se o paciente não for encontrado, retorne um erro
    if (!paciente) {
      return res.status(400).json({
        erro: true,
        mensagem: "Email não encontrado. Verifique os dados e tente novamente.",
      });
    }

    // Verifique se a senha corresponde à senha no banco de dados
    if (paciente.senha !== senha) {
      return res.status(400).json({
        erro: true,
        mensagem: "Senha incorreta. Verifique os dados e tente novamente.",
      });
    }

    // Se chegou até aqui, o login é bem-sucedido
    return res.json({
      erro: false,
      mensagem: "Login efetuado com sucesso",
      paciente,
    });
  } catch (error) {
    console.error("Erro no login:", error);

    // Mantenha mensagens de erro consistentes
    return res.status(400).json({
      erro: true,
      mensagem: "Erro no login. Verifique os dados e tente novamente.",
    });
  }
});

// Rota para autenticação do paciente
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  // Faça a autenticação do paciente aqui
  // Se a autenticação for bem-sucedida, envie os dados do paciente
  const paciente = await autenticarPaciente(email, senha);

  if (paciente) {
    res.json({
      success: true,
      paciente: paciente, // Envie os dados do paciente
    });
  } else {
    res.json({
      success: false,
      mensagem: 'Credenciais inválidas',
    });
  }
});

app.post('/atualizar-paciente', async (req, res) => {
  try {
    const { id, nome, email, rua, numero, cep, cidade, estado, rg, cpf, ...outrasInformacoes } = req.body;

    // Valide os dados, se necessário

    // Atualize o perfil do paciente no banco de dados
    const paciente = await Paciente.findByPk(id);
    if (paciente) {
      paciente.nome = nome;
      paciente.email = email;
      paciente.rua = rua;
      paciente.numero = numero;
      paciente.cep = cep;
      paciente.cidade = cidade;
      paciente.estado = estado; 
      // Atualize outras informações conforme necessário
      await paciente.save();

      return res.json({ success: true, message: 'Perfil atualizado com sucesso', paciente });
    } else {
      return res.status(404).json({ success: false, message: 'Paciente não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar perfil do paciente:', error);
    return res.status(500).json({ success: false, message: 'Erro ao atualizar perfil' });
  }
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});
