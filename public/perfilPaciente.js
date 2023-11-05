document.addEventListener('DOMContentLoaded', function () {

  // Função para carregar os dados do paciente do localStorage
  function loadPatientData() {


  const nomePaciente = document.getElementById('nomePaciente');
  const fotoPerfil = document.getElementById('fotoPerfil');

  const token = localStorage.getItem('token');
  const email = localStorage.getItem('emailPaciente');
  const nome = localStorage.getItem('nomePaciente');


  if (token && email && nome) {
    // Os dados do paciente estão armazenados no localStorage
    // Atualize os campos na página de perfil com os dados do paciente
    nomePaciente.textContent = nome;
    // Você pode fazer o mesmo com a imagem de perfil (fotoPerfil) se estiver armazenando a imagem no localStorage.
  }
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

    // Pegue os valores dos campos do formulário
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;
    const cep = document.getElementById('cep').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;

    // Realize a validação dos campos, se necessário

    // Crie um objeto para enviar ao servidor
    const dadosPaciente = {
      rua,
      numero,
      cep,
      cidade,
      estado,
    };

    // Envie os dados para o servidor usando uma solicitação POST
    fetch('/api/atualizar-paciente', {
      method: 'POST',
      body: JSON.stringify(dadosPaciente),
      headers: {
        'Content-Type': 'application/json', // Informe que os dados são JSON
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Atualize os campos na página com os novos dados do paciente
          document.getElementById('rua').value = rua;
          document.getElementById('numero').value = numero;
          document.getElementById('cep').value = cep;
          document.getElementById('cidade').value = cidade;
          document.getElementById('estado').value = estado;

          // Exiba uma mensagem de sucesso
          alert('Perfil atualizado com sucesso!');
        } else {
          alert('Erro ao atualizar perfil: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Erro na solicitação de atualização:', error);
      });
  }

  const atualizarButton = document.getElementById('atualizarButton');
  atualizarButton.addEventListener('click', atualizarPerfil);
});

document.addEventListener('DOMContentLoaded', function () {
  const atualizarButton = document.getElementById('atualizarButton');
  atualizarButton.addEventListener('click', atualizarPerfil);

  function atualizarPerfil(event) {
    event.preventDefault();

    // Obtenha os valores dos campos do formulário
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;
    const cep = document.getElementById('cep').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;

    // Realize a validação dos campos, se necessário

    // Crie um objeto para enviar ao servidor
    const dadosPaciente = {
      rua,
      numero,
      cep,
      cidade,
      estado,
    };

    // Envie os dados para o servidor usando uma solicitação POST
    fetch('/api/atualizar-paciente', {
      method: 'POST',
      body: JSON.stringify(dadosPaciente),
      headers: {
        'Content-Type': 'application/json', // Informe que os dados são JSON
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Atualize os campos na página com os novos dados do paciente
          document.getElementById('ruaPaciente').textContent = rua;
          document.getElementById('numeroPaciente').textContent = numero;
          document.getElementById('cepPaciente').textContent = cep;
          document.getElementById('cidadePaciente').textContent = cidade;
          document.getElementById('estadoPaciente').textContent = estado;

          // Exiba uma mensagem de sucesso
          alert('Perfil atualizado com sucesso!');
        } else {
          alert('Erro ao atualizar perfil: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Erro na solicitação de atualização:', error);
      });
  }
});
