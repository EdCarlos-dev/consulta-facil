document.addEventListener('DOMContentLoaded', function () {
  
  // Função para carregar os dados do médico do localStorage
  function loadMedicoData() {
    const nomeMedico = document.getElementById('nomeMedico');
    const fotoPerfil = document.getElementById('fotoPerfil');
    const nomePaciente = document.getElementById('nomePaciente');
    const dataNascimentoPaciente = document.getElementById('dataNascimentoPaciente');
    const outrasInformacoesPaciente = document.getElementById('outrasInformacoesPaciente');

    // Aqui, você deve obter o token do localStorage
    const token = localStorage.getItem('token');

    // Adicione a verificação do token para garantir a autenticação
    if (!token) {
      // Redirecione ou exiba uma mensagem de erro, pois o médico não está autenticado.
      // Exemplo: window.location.href = 'pagina-de-login.html';
      // Ou exibir uma mensagem de erro no perfil do médico.
      return;
    }

    // Se o token estiver disponível, você pode carregar os dados do médico
    const email = localStorage.getItem('emailMedico');
    const nome = localStorage.getItem('nomeMedico');

    // Atualize os campos na página de perfil com os dados do médico
    nomeMedico.textContent = nome;
    // Você pode adicionar mais campos conforme necessário
  }

  // Chame a função para carregar os dados do médico quando a página for carregada
  loadMedicoData();

  // Adicione lógica para carregar informações do paciente e consultas passadas aqui

  // Adicione lógica para atualizar o quadro clínico do paciente
  const quadroClinicoText = document.getElementById('quadroClinicoText');
  const atualizarQuadroClinico = document.getElementById('atualizarQuadroClinico');

  atualizarQuadroClinico.addEventListener('click', function () {
    const quadroClinico = quadroClinicoText.value;

    // Adicione lógica para enviar o quadro clínico ao servidor e atualizar as informações, se necessário
    console.log('Quadro Clínico Atualizado:', quadroClinico);
  });

  // Adicione outras funcionalidades conforme necessário
});
