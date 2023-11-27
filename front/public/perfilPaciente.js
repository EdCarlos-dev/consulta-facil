document.addEventListener('DOMContentLoaded', function () {

  // Função para carregar os dados do paciente do localStorage
  function loadPatientData() {
    const nomePaciente = document.getElementById('nomePaciente');
    const emailPaciente = document.getElementById('emailPaciente');
    const rgPaciente = document.getElementById('rgPaciente');
    const cpfPaciente = document.getElementById('cpfPaciente');
    const ruaPaciente = document.getElementById('ruaPaciente');
    const numeroPaciente = document.getElementById('numeroPaciente');
    const cepPaciente = document.getElementById('cepPaciente');
    const cidadePaciente = document.getElementById('cidadePaciente');
    const estadoPaciente = document.getElementById('estadoPaciente');
    const fotoPerfil = document.getElementById('fotoPerfil');

     // Aqui, você deve obter o token do localStorage
     const token = localStorage.getItem('token');

      // Adicione a verificação do token para garantir a autenticação
    if (!token) {
      // Redirecione ou exiba uma mensagem de erro, pois o paciente não está autenticado.
      // Exemplo: window.location.href = 'pagina-de-login.html';
      // Ou exibir uma mensagem de erro no perfil do paciente.
      return;
    }

    // Se o token estiver disponível, você pode carregar os dados do paciente
    const email = localStorage.getItem('emailPaciente');
    const nome = localStorage.getItem('nomePaciente');
    const rg = localStorage.getItem('rgPaciente');
    const cpf = localStorage.getItem('cpfPaciente');
    const rua = localStorage.getItem('ruaPaciente');
    const numero = localStorage.getItem('numeroPaciente');
    const cep = localStorage.getItem('cepPaciente');
    const cidade = localStorage.getItem('cidadePaciente');
    const estado = localStorage.getItem('estadoPaciente');
    
     // Atualize os campos na página de perfil com os dados do paciente
     nomePaciente.textContent = nome;
     emailPaciente.textContent = email;
     rgPaciente.textContent = rg;
     cpfPaciente.textContent = cpf;
     ruaPaciente.textContent = rua;
     numeroPaciente.textContent = numero;
     cepPaciente.textContent = cep;
     cidadePaciente.textContent = cidade;
     estadoPaciente.textContent = estado;
     // Você pode fazer o mesmo com a imagem de perfil (fotoPerfil) se estiver armazenando a imagem no localStorage.
     
   }

  // Chame a função para carregar os dados do paciente quando a página for carregada
  loadPatientData();

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
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;
    const cep = document.getElementById('cep').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    

    

    // Crie um objeto para enviar ao servidor
    const dadosPaciente = {
      rua,
      numero,
      cep,
      cidade,
      estado,
      
    };

   // Envie os dados para o servidor usando uma solicitação POST
  fetch('/atualizar-paciente', {
    method: 'POST',
    body: JSON.stringify({ dadosPaciente, token }), // Inclua o token no objeto de dados
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

  const atualizarButton = document.getElementById('atualizarButton');
  atualizarButton.addEventListener('click', atualizarPerfil);
});
