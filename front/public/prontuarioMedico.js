document.addEventListener("DOMContentLoaded", async function () {
  // Obter informações do paciente e histórico de consultas
  const response = await fetch(`/consultas-agendadas`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    },
  });

  const data = await response.json();

  // Exibir as informações na página
  exibirInformacoesPaciente(data);
  exibirHistoricoConsultas(data.historico);
  console.log(data);
  exibirComentariosEnfermeiro(data);
});

function obterPacienteIdDaURL() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('pacienteId');
}

function formatarData(data) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(data).toLocaleDateString('pt-BR', options);
}

function exibirInformacoesPaciente(data) {
  const tabelaPaciente = document.getElementById('corpo-tabela-paciente');

  if (data && data.length > 0) {
    const rows = data.map(consulta => {
      const { paciente_id, nome_paciente, data_consulta, especialidade, comentarios, status } = consulta;
      return `<tr>
                <td>${paciente_id}</td>
                <td>${nome_paciente}</td>
                <td>${formatarData(data_consulta)}</td>
                <td>${especialidade}</td>
                <td>${comentarios}</td>
                <td>${status}</td>
                <td><a href="atendimentoMedico.html?pacienteId=${paciente_id}">Atendimento Médico</a></td>
              </tr>`;
    }).join('');
    tabelaPaciente.innerHTML = rows;
  } else {
    tabelaPaciente.innerHTML = '<tr><td colspan="7">Nenhuma informação do paciente disponível.</td></tr>';
  }
}
  
// function exibirComentariosEnfermeiro(comentariosEnfermeiro) {
//     console.log(comentariosEnfermeiro);
//     const comentariosEnfermeiroDiv = document.getElementById('comentariosEnfermeiro');
    
//     if (comentariosEnfermeiro && comentariosEnfermeiro.length > 0) {
//       const comentariosHTML = comentariosEnfermeiro.map(comentario => `<p>${comentario.comentarios}</p>`).join('');
//       comentariosEnfermeiroDiv.innerHTML = `<h2>Comentários do Enfermeiro</h2>${comentariosHTML}`;
//     } else {
//       comentariosEnfermeiroDiv.innerHTML = '<p>Sem comentários do enfermeiro disponíveis.</p>';
//     }
//   }

  