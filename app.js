const express = require('express');
const app = express();
const path = require('path');

// Outras configurações do Express...

// Rota para abrir o arquivo login.js
app.get('/login.js', (req, res) => {
  // Caminho relativo para o arquivo login.js a partir do diretório atual (onde app.js está localizado)
  const loginJSPath = path.join(__dirname, 'login.js');

  // Envie o arquivo login.js como resposta
  res.sendFile(loginJSPath);
});

// Outras rotas e configurações...

// Inicie o servidor Express...
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor Express em execução na porta ${port}`);
});
