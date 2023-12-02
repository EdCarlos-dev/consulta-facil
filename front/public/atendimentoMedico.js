document.addEventListener('DOMContentLoaded', async function () {
  // Obter ID do paciente da URL
  const pacienteId = obterPacienteIdDaURL();

  // Obter informações do paciente e histórico de consultas
  const response = await fetch(`/pacientes/${pacienteId}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    },
  });

  const pacienteData = await response.json();

  // Exibir as informações na página
  exibirInformacoesPaciente(pacienteData);
  exibirHistoricoAtendimentos(pacienteData.historicoAtendimentos);
});

function obterPacienteIdDaURL() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('pacienteId');
}

function exibirInformacoesPaciente(pacienteData) {
  const nomePaciente = document.getElementById('nomePaciente');
  const dataNascimentoPaciente = document.getElementById('dataNascimentoPaciente');

  // Atualizar os campos na página com os dados do paciente
  nomePaciente.textContent = pacienteData.nome;
  dataNascimentoPaciente.textContent = pacienteData.data_nascimento;
  // Atualizar outros campos conforme necessário
}

function exibirHistoricoAtendimentos(historicoAtendimentos) {
  const tabelaAtendimentos = document.getElementById('corpoTabelaAtendimentos');

  if (historicoAtendimentos && historicoAtendimentos.length > 0) {
    const rows = historicoAtendimentos.map(atendimento => {
      const { data_consulta, especialidade, status, comentarios_enfermeiro } = atendimento;
      return `<tr>
                <td>${formatarData(data_consulta)}</td>
                <td>${especialidade}</td>
                <td>${status}</td>
                <td>${comentarios_enfermeiro}</td>
              </tr>`;
    }).join('');
    tabelaAtendimentos.innerHTML = rows;
  } else {
    tabelaAtendimentos.innerHTML = '<tr><td colspan="4">Nenhum histórico de atendimentos disponível.</td></tr>';
  }
}
