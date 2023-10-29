const express = require('express');
const jwt = require('jsonwebtoken');
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

// Importe o modelo de Informacoes do paciente no início do arquivo
const Informacoes = sequelize.define('Informacoes', {
  rua: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rg: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},{
  tableName: 'informacoes_pacientes',
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
  crm: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  especialidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

},{
  tableName: 'medico',
});

// Defina o modelo de enfermeiro usando o Sequelize
const Enfermeiro = sequelize.define('Enfermeiro', {
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
  coren: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

},{
  tableName: 'enfermeiro',
});

// Defina o modelo de agendamentos usando o Sequelize
const Agendamento = sequelize.define('Agendamento', {
  paciente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data_consulta: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  especialidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('agendada', 'realizada', 'cancelada'),
    defaultValue: 'agendada',
    allowNull: false,
  },
}, {
  tableName: 'agendamentos',
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

// Middleware de verificação de token (jwt.verify)
function verificarToken(req, res, next) {
  const token = req.headers.authorization; // Recupere o token do cabeçalho

  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  jwt.verify(token, 'chave-secreta-do-servidor', (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: 'Token inválido' });
    }

    // Token válido, o paciente está autenticado
    req.pacienteId = decoded.pacienteId;
    next();
  });
}

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

// Rota de exemplo que requer autenticação
app.get('/rota-protegida', verificarToken, (req, res) => {
  // Esta rota requer autenticação; o paciente está autenticado
  res.json({ mensagem: 'Rota protegida acessada com sucesso' });
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
    crm,
    especialidade,
    concordou: concordouCheckbox === 'on', // checkbox é enviado apenas se marcado
  });

  // Após o cadastro bem-sucedido, redirecione para a página de login
  res.redirect('/login');
} catch (error) {
  console.error("Erro ao cadastrar médico:", error);

  // Mantenha mensagens de erro consistentes
  return res.status(400).json({
    erro: true,
    mensagem: "Erro ao cadastrar médico. Verifique os dados e tente novamente.",
  });
}
});

// Rota para a requisição do perfil Paciente 
app.post("/informacoes-pacientes", async (req, res) => {
  try {
    const { rua, numero, cep, cidade, estado } = req.body;

    // Faça as validações necessárias antes de criar atualizar perfil paciente

    // Crie o perfil com os dados extraídos
    const novoInformacoes = await Informacoes.create({
      rua,
      numero,
      cep,
      cidade,
      estado,
    });

    return res.json({
      erro: false,
      mensagem: "Perfil atualizado com sucesso",
      usuario: novoInformacoes,
    });
  } catch (error) {
    console.error("Erro ao atualizar cadastro:", error);

    // Mantenha mensagens de erro consistentes
    return res.status(400).json({
      erro: true,
      mensagem: "Erro ao atualizar paciente. Verifique os dados e tente novamente.",
    });
  }
});

// Rota de login
app.post('/login', async (req, res) => {
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

    // Gere um token de autenticação
    const token = jwt.sign({ pacienteId: paciente.id }, 'chave-secreta-do-servidor');

    // Envie o token no corpo da resposta
    return res.json({
      erro: false,
      mensagem: "Login efetuado com sucesso",
      paciente,
      token, // Envie o token
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

// Rota para atualizar informações do paciente
app.post('/api/atualizar-paciente', verificarToken, async (req, res) => {
  const { rua, numero, cep, cidade, estado } = req.body;

  // Recupere o ID do paciente do token
  const pacienteId = req.pacienteId;

  try {
    // Verifique se as informações do paciente já existem no banco de dados
    let informacoes = await Informacoes.findOne({ where: { id_paciente: pacienteId } });

    // Se as informações não existem, crie um novo registro
    if (!informacoes) {
      informacoes = await Informacoes.create({
        rua,
        numero,
        cep,
        cidade,
        estado,
        id_paciente: pacienteId,
      });
    } else {
      // As informações já existem, atualize-as
      informacoes.rua = rua;
      informacoes.numero = numero;
      informacoes.cep = cep;
      informacoes.cidade = cidade;
      informacoes.estado = estado;
      await informacoes.save();
    }

    res.json({ success: true, message: 'Informações do paciente atualizadas com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar informações do paciente:', error);
    res.status(500).json({ success: false, message: 'Erro ao atualizar informações do paciente.' });
  }
});

// Função para obter informações do paciente com base no ID
async function obterInformacoesPacientePorId(idPaciente) {
  try {
    // Consultar o paciente com base no ID
    const paciente = await Paciente.findByPk(idPaciente);
    
    if (!paciente) {
      // Paciente não encontrado, retorne null ou lide com o erro apropriadamente
      return null;
    }

    return paciente;
  } catch (error) {
    // Lide com erros de consulta de banco de dados
    console.error("Erro ao obter informações do paciente por ID:", error);
    throw error;
  }
}

// Rota para enviar dados para a tabela informacoes_pacientes
app.post('/atualizar-informacoes-paciente', async (req, res) => {
  try {
    const { rua, numero, cep, cidade, estado, rg, cpf, idPaciente } = req.body;

    // Verifique se o paciente existe antes de criar informações
    const paciente = await obterInformacoesPacientePorId(idPaciente);

    if (!paciente) {
      return res.status(400).json({
        erro: true,
        mensagem: "Paciente não encontrado. Verifique o ID do paciente e tente novamente.",
      });
    }

    // Crie o registro na tabela informacoes_pacientes
    const novoRegistroInformacoes = await Informacoes.create({
      rua,
      numero,
      cep,
      cidade,
      estado,
      rg,
      cpf,
      id_paciente: idPaciente,
    });

    return res.json({
      erro: false,
      mensagem: "Informações do paciente atualizadas com sucesso",
      registroInformacoes: novoRegistroInformacoes,
    });
  } catch (error) {
    console.error("Erro ao atualizar informações do paciente:", error);

    // Mantenha mensagens de erro consistentes
    return res.status(400).json({
      erro: true,
      mensagem: "Erro ao atualizar informações do paciente. Verifique os dados e tente novamente.",
    });
  }
});


// Rota para marcar uma nova consulta
app.post('/marcar-consulta', async (req, res) => {
  try {
    const { pacienteId, dataConsulta, especialidade } = req.body;

    // Crie o agendamento com os dados fornecidos
    const novoAgendamento = await Agendamento.create({
      paciente_id: pacienteId,
      data_consulta: dataConsulta,
      especialidade,
    });

    return res.json({
      erro: false,
      mensagem: 'Consulta marcada com sucesso',
      agendamento: novoAgendamento,
    });
  } catch (error) {
    console.error('Erro ao marcar consulta:', error);
    return res.status(500).json({
      erro: true,
      mensagem: 'Erro ao marcar consulta. Verifique os dados e tente novamente.',
    });
  }
});

// Rota para listar todas as consultas agendadas
app.get('/consultas-agendadas', async (req, res) => {
  try {
    // Consulte o banco de dados para obter todas as consultas agendadas
    const consultasAgendadas = await Agendamento.findAll();

    return res.json(consultasAgendadas);
  } catch (error) {
    console.error('Erro ao listar consultas agendadas:', error);
    return res.status(500).json({
      erro: true,
      mensagem: 'Erro ao listar consultas agendadas.',
    });
  }
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});
