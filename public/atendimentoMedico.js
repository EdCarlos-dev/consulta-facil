document.addEventListener('DOMContentLoaded', function () {

    // Função para carregar os dados do médico do localStorage
    function loadMedicoData() {
      const nomeMedico = document.getElementById('nomeMedico');
      const fotoPerfil = document.getElementById('fotoPerfil');
      // Adicione mais campos conforme necessário
  
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
  
      // Pegue os valores dos campos do formulário
      const campo1 = document.getElementById('campo1').value;
      const campo2 = document.getElementById('campo2').value;
      const rua = document.getElementById('rua').value;
      const numero = document.getElementById('numero').value;
      const cep = document.getElementById('cep').value;
      const cidade = document.getElementById('cidade').value;
      const estado = document.getElementById('estado').value;
      const rg = document.getElementById('rg').value;
      const cpf = document.getElementById('cpf').value;
      // Adicione mais campos conforme necessário
  
      // Realize a validação dos campos, se necessário
  
      // Crie um objeto para enviar ao servidor
      const dadosMedico = {
        campo1,
        campo2,
        rua,
        numero,
        cep,
        cidade,
        estado,
        rg,
        cpf,
        // Adicione mais campos conforme necessário
      };
  
      // Envie os dados para o servidor usando uma solicitação POST
      fetch('/atualizar-medico', {
        method: 'POST',
        body: JSON.stringify({ dadosMedico, token }), // Inclua o token no objeto de dados
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Envie o token no cabeçalho
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
            alert('Perfil atualizado com sucesso!');
          } else {
            alert('Erro ao atualizar perfil: ' + data.message || 'Erro desconhecido');
          }
        })
        .catch((error) => {
          console.error('Erro na solicitação de atualização:', error);
          alert('Erro ao atualizar perfil: ' + error.message || 'Erro desconhecido');
        });
    }
  });
  


