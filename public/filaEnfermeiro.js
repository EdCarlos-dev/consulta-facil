document.addEventListener('DOMContentLoaded', function () {
  // Função para carregar os dados do enfermeiro do localStorage
  function loadEnfermeiroData() {
    const nomeEnfermeiro = document.getElementById('nomeEnfermeiro');
    const fotoPerfil = document.getElementById('fotoPerfil');

    // Aqui, você deve obter o token do localStorage
    const token = localStorage.getItem('token');

    // Adicione a verificação do token para garantir a autenticação
    if (!token) {
      // Redirecione ou exiba uma mensagem de erro, pois o enfermeiro não está autenticado.
      // Exemplo: window.location.href = 'pagina-de-login.html';
      // Ou exibir uma mensagem de erro no perfil do enfermeiro.
      return;
    }

    // Se o token estiver disponível, você pode carregar os dados do enfermeiro
    const email = localStorage.getItem('emailEnfermeiro');
    const nome = localStorage.getItem('nomeEnfermeiro');

    // Atualize os campos na página de perfil com os dados do enfermeiro
    nomeEnfermeiro.textContent = ` ${nome}`;
  }

  // Chame a função para carregar os dados do enfermeiro quando a página for carregada
  loadEnfermeiroData();

  const atualizarButton = document.getElementById('atualizarButton');
  atualizarButton.addEventListener('click', atualizarPerfil);

  const fotoPerfil = document.getElementById('fotoPerfil');
  const inputImagem = document.getElementById('inputImagem');
  const trocarImagemButton = document.getElementById('trocarImagemButton');

  // Função para lidar com a troca de imagem de perfil
  function trocarImagemDePerfil() {
    inputImagem.click();
  }

  fotoPerfil.addEventListener('click', trocarImagemDePerfil);

  inputImagem.addEventListener('change', function (event) {
    const imagemSelecionada = event.target.files[0];

    if (imagemSelecionada) {
      const reader = new FileReader();

      reader.onload = function (e) {
        fotoPerfil.src = e.target.result;
      };

      reader.readAsDataURL(imagemSelecionada);

      // Você pode enviar a imagem ao servidor para salvar, se necessário
      // Certifique-se de adicionar essa funcionalidade na função atualizarPerfil
    }
  });

  // Função para lidar com a atualização do perfil
  function atualizarPerfil(event) {
    event.preventDefault();

    // Pegue o token do localStorage
    const token = localStorage.getItem('token');

    // Certifique-se de que o token existe
    if (!token) {
      alert('Token não fornecido. Faça o login novamente.');
      // Redirecione o usuário para a página de login ou tome outra ação apropriada.
      return;
    }

    // Crie um objeto para enviar ao servidor
    const dadosEnfermeiro = {};

    // Envie os dados para o servidor usando uma solicitação POST
    fetch('/atualizar-enfermeiro', {
      method: 'POST',
      body: JSON.stringify({ dadosEnfermeiro, token }), // Inclua o token no objeto de dados
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Envie o token no cabeçalho
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na solicitação');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          // Atualização bem-sucedida, você pode adicionar lógica adicional aqui, se necessário.
        } else {
          alert('Erro ao atualizar perfil: ' + data.message || 'Erro desconhecido');
        }
      })
      .catch((error) => {
        console.error('Erro na solicitação de atualização:', error);
        alert('Erro ao atualizar perfil: ' + error.message || 'Erro desconhecido');
      });
  }

  // Função para obter a fila de atendimento para o dia atual
  function obterFilaDeAtendimento() {
    // Obtenha a data atual em um formato adequado para a sua API
    const dataAtual = new Date().toISOString();

    // Envie uma solicitação ao servidor para obter a fila de atendimento com base na data atual
    fetch(`/obter-fila-atendimento?data=${dataAtual}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'), // Use o token armazenado localmente após o login
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Atualize a interface com a fila de atendimento
        // (por exemplo, preencha uma tabela ou outra estrutura HTML)
        const filaAtendimento = document.getElementById('filaAtendimento');

        data.forEach((paciente) => {
          const pacienteItem = document.createElement('li');
          pacienteItem.textContent = `Nome: ${paciente.nome}, Data de Nascimento: ${paciente.dataNascimento}`;
          filaAtendimento.appendChild(pacienteItem);
        });
      })
      .catch((error) => {
        console.error('Erro ao obter fila de atendimento:', error);
      });
  }

  // Chame a função para obter a fila de atendimento quando a página for carregada
  obterFilaDeAtendimento();
});
