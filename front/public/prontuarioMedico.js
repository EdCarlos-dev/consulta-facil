document.addEventListener("DOMContentLoaded", async function () {
    const pacienteId = obterPacienteIdDaURL(); // Função a ser implementada para obter o ID do paciente da URL
  
    // Obter informações do paciente e histórico de consultas
    const response = await fetch(`/prontuario-medico/${pacienteId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    });
  
    const data = await response.json();
  
    // Exibir as informações na página
    exibirInformacoesPaciente(data.paciente);
    exibirHistoricoConsultas(data.historico);
    exibirComentariosEnfermeiro(data.comentariosEnfermeiro);
  });
  
  function obterPacienteIdDaURL() {
    // Implemente a lógica para obter o ID do paciente da URL
  }
  
  function exibirInformacoesPaciente(paciente) {
    // Implemente a lógica para exibir as informações do paciente na página
  }
  
  function exibirHistoricoConsultas(historico) {
    // Implemente a lógica para exibir o histórico de consultas na página
  }
  function exibirComentariosEnfermeiro(comentariosEnfermeiro) {
    const comentariosEnfermeiroDiv = document.getElementById('comentariosEnfermeiro');
    
    if (comentariosEnfermeiro && comentariosEnfermeiro.length > 0) {
      const comentariosHTML = comentariosEnfermeiro.map(comentario => `<p>${comentario}</p>`).join('');
      comentariosEnfermeiroDiv.innerHTML = `<h2>Comentários do Enfermeiro</h2>${comentariosHTML}`;
    } else {
      comentariosEnfermeiroDiv.innerHTML = '<p>Sem comentários do enfermeiro disponíveis.</p>';
    }
  }


  