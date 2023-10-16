document.addEventListener('DOMContentLoaded', function () {
  const nomePaciente = document.getElementById('nomePaciente');
  const emailPaciente = document.getElementById('emailPaciente');
  const ruaPaciente = document.getElementById('ruaPaciente');
  const numeroPaciente = document.getElementById('numeroPaciente');
  const cepPaciente = document.getElementById('cepPaciente');
  const cidadePaciente = document.getElementById('cidadePaciente');
  const estadoPaciente = document.getElementById('estadoPaciente');
  const fotoPerfil = document.getElementById('fotoPerfil');
  const inputImagem = document.getElementById('inputImagem');
  const trocarImagemButton = document.getElementById('trocarImagemButton');

  // Função para obter os dados do paciente do servidor
  function obterDadosPaciente() {
    fetch('/api/paciente') // Substitua pela rota correta para obter dados do paciente
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const paciente = data.paciente;
          // Atualize os campos na página com os dados do paciente
          nomePaciente.textContent = paciente.nome;
          emailPaciente.textContent = paciente.email;
          ruaPaciente.textContent = paciente.rua;
          numeroPaciente.textContent = paciente.numero;
          cepPaciente.textContent = paciente.cep;
          cidadePaciente.textContent = paciente.cidade;
          estadoPaciente.textContent = paciente.estado;

          // Atualize a imagem de perfil
          if (paciente.fotoPerfil) {
            fotoPerfil.src = paciente.fotoPerfil;
          }
        } else {
          console.error('Erro ao obter os dados do paciente');
        }
      })
      .catch(error => {
        console.error('Erro na solicitação:', error);
      });
  }

  // Execute a função para obter os dados do paciente ao carregar a página
  obterDadosPaciente();

  // Função para lidar com a troca de imagem de perfil
  function trocarImagemDePerfil() {
    inputImagem.click();
  }

  trocarImagemButton.addEventListener('click', trocarImagemDePerfil);

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
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const ruaPaciente = document.getElementById('ruaPaciente').value;
  const numeroPaciente = document.getElementById('numeroPaciente').value;
  const cepPaciente = document.getElementById('cepPaciente').value;
  const cidadePaciente = document.getElementById('cidadePaciente').value;
  const estadoPaciente = document.getElementById('estadoPaciente').value;

    // Realize a validação dos campos, se necessário

    // Realize uma solicitação para atualizar os dados do paciente, incluindo a imagem
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('email', email);
    formData.append('rua', rua);
    formData.append('numero', numero);
    formData.append('cep', cep);
    formData.append('cidade', cidade);
    formData.append('estado', estado);

    // Adicione a imagem selecionada ao FormData, se houver uma

    fetch('/api/atualizar-paciente', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Atualize os campos na página com os novos dados do paciente
          nomePaciente.textContent = nome;
          emailPaciente.textContent = email;
          ruaPaciente.textContent = rua;
          numeroPaciente.textContent = numero;
          cepPaciente.textContent = cep;
          cidadePaciente.textContent = cidade;
          estadoPaciente.textContent = estado;

          // Exiba uma mensagem de sucesso
          alert('Perfil atualizado com sucesso!');
        } else {
          alert('Erro ao atualizar perfil: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Erro na solicitação de atualização:', error);
      });
  }

  const atualizarButton = document.querySelector('.btn-atualizar');
  atualizarButton.addEventListener('click', atualizarPerfil);
});
