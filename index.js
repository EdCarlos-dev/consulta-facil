// Importar as classes e funções necessárias
const Sistema = require('./sistema');
const Usuario = require('./Usuario');
const Medicamento = require('./medicamento');
const Receita = require('./receita');

// Criar instâncias do sistema e usuários
const sistema = new Sistema();
const usuario1 = new Usuario('João');
const usuario2 = new Usuario('Maria');

// Adicionar os usuários ao sistema
sistema.adicionarUsuario(usuario1);
sistema.adicionarUsuario(usuario2);

// Cadastrar uma receita para um usuário
const usuario = sistema.usuarios[0];
const medicamentos = [
  new Medicamento("Paracetamol", "500mg", "8 horas"),
  new Medicamento("Amoxicilina", "250mg", "12 horas")
];
const dataReceita = "2023-05-15";

const receita = new Receita(usuario, medicamentos, dataReceita);
usuario.adicionarReceita(receita);

// Exibir informações da receita cadastrada
console.log(`Receita cadastrada para o usuário ${usuario.nome} em ${dataReceita}`);
console.log("Medicamentos prescritos:");
for (const medicamento of receita.medicamentos) {
  console.log(`- ${medicamento.nome}: ${medicamento.dosagem}, Intervalo: ${medicamento.intervalo}`);
}

// Criar uma função para redirecionar para a seção desejada
function redirecionarParaSecao(secaoId) {
  // Encontrar a seção pelo ID
  const secao = document.querySelector(`#${secaoId}`);
  if (secao) {
    // Rolar a página para a seção
    secao.scrollIntoView({ behavior: 'smooth' });
  }
}

// Adicionar evento de clique aos botões
document.getElementById('btn-cadastro').addEventListener('click', () => {
  redirecionarParaSecao('cadastro');
});

document.getElementById('btn-login').addEventListener('click', () => {
  redirecionarParaSecao('login');
});

document.getElementById('btn-busca').addEventListener('click', () => {
  redirecionarParaSecao('busca');
});

// Adicionar evento de clique ao botão de medicamentos
document.getElementById('btn-medicamentos').addEventListener('click', () => {
  window.location.href = 'medicamentos.html';
});

/// Capturando o formulário de login
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

// Adicionando o evento de envio do formulário
loginForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevenindo o envio padrão do formulário

  // Obtendo os valores do formulário
  const email = document.getElementById('email-login').value;
  const senha = document.getElementById('senha-login').value;

  // Realizando o processo de login
  const usuarioLogado = sistema2.login(email, senha);

  // Verificando se o login foi bem-sucedido
  if (usuarioLogado) {
    console.log(`Usuário ${usuarioLogado.nome} fez login com sucesso!`);
    // Redirecionar para a página desejada após o login
    window.location.href = 'pagina-logada.html';
  } else {
    // Exibindo a mensagem de erro
    loginError.style.display = 'block';
  }
});
