document.addEventListener("DOMContentLoaded", async function () {
  try {
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
  } catch (error) {
    console.error('Erro ao carregar informações do paciente:', error);
  }
});

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

function exibirHistoricoConsultas(historico) {
  const tabelaHistorico = document.getElementById('corpo-tabela-historico');

  if (historico && historico.length > 0) {
    const rows = historico.map(consulta => {
      const { data_consulta, especialidade, comentarios, status } = consulta;
      return `<tr>
                <td>${formatarData(data_consulta)}</td>
                <td>${especialidade}</td>
                <td>${comentarios}</td>
                <td>${status}</td>
              </tr>`;
    }).join('');
    tabelaHistorico.innerHTML = rows;
  } else {
    tabelaHistorico.innerHTML = '<tr><td colspan="4">Nenhum histórico de consultas disponível.</td></tr>';
  }
}
