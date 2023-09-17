const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const app = express();
const port = 3001;

// Middleware para processar dados de formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conexão com o banco de dados SQLite (clinica.sql)
const db = new sqlite3.Database('clinica.sql', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite');
  }
});

// Rota de autenticação de login
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;

  // Consulta o banco de dados para encontrar o paciente pelo email
  const sql = 'SELECT * FROM pacientes WHERE email = ?';

  db.get(sql, [email], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    if (!row) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Compara a senha fornecida com a senha armazenada no banco de dados
    bcrypt.compare(senha, row.senha, (bcryptErr, result) => {
      if (bcryptErr) {
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }

      if (result) {
        // Autenticação bem-sucedida, pode gerar um token de autenticação aqui, por exemplo
        res.status(200).json({ success: true, message: 'Autenticação bem-sucedida' });
      } else {
        res.status(401).json({ error: 'Credenciais inválidas' });
      }
    });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});
