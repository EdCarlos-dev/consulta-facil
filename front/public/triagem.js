document.addEventListener('DOMContentLoaded', function () {
    const nomePaciente = document.getElementById('nomePaciente');
    const emailPaciente = document.getElementById('emailPaciente');
    const numeroSUS = document.getElementById('numeroSUS');
    const atenderButton = document.getElementById('atenderButton');
    const proximoButton = document.getElementById('proximoButton');
  
    function obterProximoPaciente() {
      fetch('/obter-proximo-paciente-triagem', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.nome) {
            nomePaciente.textContent = `Nome: ${data.nome}`;
            emailPaciente.textContent = `E-mail: ${data.email}`;
            numeroSUS.textContent = `Número do SUS: ${data.numeroSUS}`;
          } else {
            nomePaciente.textContent = 'Nenhum paciente na fila de triagem.';
            emailPaciente.textContent = '';
            numeroSUS.textContent = '';
          }
        })
        .catch(error => {
          console.error('Erro ao obter próximo paciente:', error);
        });
    }
  
    obterProximoPaciente();
  
    atenderButton.addEventListener('click', function () {
      // Lógica para atender o paciente, enviar dados ao servidor, etc.
      obterProximoPaciente();
    });
  
    proximoButton.addEventListener('click', function () {
      // Lógica para passar para o próximo paciente na fila
      obterProximoPaciente();
    });
  });
  