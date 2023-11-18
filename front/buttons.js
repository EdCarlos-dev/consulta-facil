// Função para redirecionar para a página de cadastro
function irParaCadastro() {
    window.location.href = '#cadastro';
  }
  
  // Função para redirecionar para a página de login
  function irParaLogin() {
    window.location.href = '#login';
  }
  
  // Função para redirecionar para a página de busca
  function irParaBusca() {
    window.location.href = '#busca';
  }
  
  // Vinculando os botões no carregamento da página
  window.onload = function() {
    const btnCadastro = document.getElementById('btn-cadastro');
    btnCadastro.addEventListener('click', irParaCadastro);
  
    const btnLogin = document.getElementById('btn-login');
    btnLogin.addEventListener('click', irParaLogin);
  
    const btnBusca = document.getElementById('btn-busca');
    btnBusca.addEventListener('click', irParaBusca);
  }
  