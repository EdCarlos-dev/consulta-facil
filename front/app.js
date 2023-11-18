const express = require('express');
const app = express();
const path = require('path');


// Outras configurações do Express...

// Rota para abrir o arquivo
app.get('/', async (req, res) => {

  res.send("Página inicial");
  
  const loginJSPath = path.join(__dirname, 'login.js');

  // Envie o arquivo login.js como resposta
  res.sendFile(loginJSPath);
});

// Outras rotas e configurações...

// Executar o projeto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor Express em execução na porta ${port}`);
});
