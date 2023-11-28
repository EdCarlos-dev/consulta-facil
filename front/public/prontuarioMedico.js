document.addEventListener("DOMContentLoaded", async function () {
    const pacienteId = 'all'; // Função a ser implementada para obter o ID do paciente da URL
  
    // Obter informações do paciente e histórico de consultas
    //const response = await fetch(`/prontuario-medico/${pacienteId}`, {
    const response = await fetch(`/consultas-agendadas`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    });
  
    const data = await response.json();
  
    // Exibir as informações na página
    exibirInformacoesPaciente(data.paciente);
    exibirHistoricoConsultas(data.historico);
    console.log(data);
    exibirComentariosEnfermeiro(data);
  });
  
  function 
  obterPacienteIdDaURL() {
    // Implemente a lógica para obter o ID do paciente da URL
  }
  
  function exibirInformacoesPaciente(paciente) {
    const tabelaPaciente = document.getElementById('corpo-tabela-paciente');
    
    if (paciente) {
      const { nome, dataConsulta, horaConsulta, especialidade } = paciente;
      const row = `<tr>
                     <td>${nome}</td>
                     <td>${dataConsulta}</td>
                     <td>${horaConsulta}</td>
                     <td>${especialidade}</td>
                  </tr>`;
      tabelaPaciente.innerHTML = row;
    } else {
      tabelaPaciente.innerHTML = '<tr><td colspan="4">Nenhuma informação do paciente disponível.</td></tr>';
    }
  }
  
  function exibirHistoricoConsultas(historico) {
    // Implemente a lógica para exibir o histórico de consultas na página
  }
  function exibirComentariosEnfermeiro(comentariosEnfermeiro) {
    console.log(comentariosEnfermeiro);
    const comentariosEnfermeiroDiv = document.getElementById('comentariosEnfermeiro');
    
    if (comentariosEnfermeiro && comentariosEnfermeiro.length > 0) {
      const comentariosHTML = comentariosEnfermeiro.map(comentario => `<p>${comentario.comentarios}</p>`).join('');
      comentariosEnfermeiroDiv.innerHTML = `<h2>Comentários do Enfermeiro</h2>${comentariosHTML}`;
    } else {
      comentariosEnfermeiroDiv.innerHTML = '<p>Sem comentários do enfermeiro disponíveis.</p>';
    }
  }


  