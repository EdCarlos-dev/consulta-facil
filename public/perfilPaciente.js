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

  // Na página perfilPaciente
document.addEventListener('DOMContentLoaded', function () {
  const nomePacienteElement = document.getElementById('nomePaciente');
  const emailPacienteElement = document.getElementById('emailPaciente');

  // Recupere as informações do paciente do localStorage
  const nomePaciente = localStorage.getItem('nomePaciente');
  const emailPaciente = localStorage.getItem('emailPaciente');

  // Preencha os campos na página com as informações recuperadas
  if (nomePaciente) {
    nomePacienteElement.textContent = nomePaciente;
  }

  if (emailPaciente) {
    emailPacienteElement.textContent = emailPaciente;
  }

  // ... Restante do seu código
});

  // Função para obter os dados do paciente do servidor
  function obterDadosPaciente() {
    const pacienteId = obterIDDoPaciente(); // Implemente uma função para obter o ID do paciente, talvez armazenado em um cookie ou local storage.
  
    if (!pacienteId) {
      // Lógica de tratamento se o ID do paciente não estiver disponível
      return;
    }
  
    fetch(`/api/informacoes-paciente/${pacienteId}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const informacoesPaciente = data.informacoesPaciente;
          // Atualize os campos na página com as informações do paciente
          // Exemplo: ruaPaciente.textContent = informacoesPaciente.rua;
        } else {
          console.error('Erro ao obter informações do paciente:', data.message);
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

  const atualizarButton = document.querySelector('.btn-atualizar');
  atualizarButton.addEventListener('click', atualizarPerfil);
});

// Função para obter os dados do paciente do servidor
function obterDadosPaciente() {
  // Salve o token no armazenamento local após o login
  const token = localStorage.getItem('token');

  fetch('/api/paciente', {
    headers: {
      Authorization: `Bearer ${token}`, // Envie o token no cabeçalho da solicitação
    },
  })
    .then(response => response.json())
    .then(data => {
      // ...
    })
    .catch(error => {
      console.error('Erro na solicitação:', error);
    });
}

// ...

// Função para lidar com a atualização do perfil
function atualizarPerfil(event) {
  event.preventDefault();

  // Use o token salvo no armazenamento local
  const token = localStorage.getItem('token');

  // ...

  fetch('/api/atualizar-paciente', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`, // Envie o token no cabeçalho da solicitação
    },
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // ...
      } else {
        alert('Erro ao atualizar perfil: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Erro na solicitação de atualização:', error);
    });
}
