document.addEventListener('DOMContentLoaded', async function () {
  try {
    // Obter ID do paciente da URL
    const pacienteId = obterPacienteIdDaURL();

    // Buscar informações do paciente
    const pacienteData = await obterInformacoesPaciente(pacienteId);

    // Buscar informações do prontuário médico
    const prontuarioData = await obterProntuarioMedico(pacienteId);

    // Exibir as informações na página
    exibirInformacoesPaciente(pacienteData, prontuarioData);
  } catch (error) {
    console.error('Erro ao carregar informações do paciente:', error);
  }
});

async function obterInformacoesPaciente(pacienteId) {
  try {
    const response = await fetch(`/pacientes/${pacienteId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Erro ao obter informações do paciente:', error);
    throw error;
  }
}

async function obterProntuarioMedico(pacienteId) {
  try {
    const response = await fetch(`/consultas-agendadas?pacienteId=${pacienteId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Erro ao obter prontuário médico:', error);
    throw error;
  }
}

function exibirInformacoesPaciente(pacienteData, prontuarioData) {
  const nomePaciente = document.getElementById('nomePaciente');
  const dataConsulta = document.getElementById('data_consulta');
  const especialidade = document.getElementById('especialidade');
  const comentarios = document.getElementById('comentarios');
  const tabelaAtendimentos = document.getElementById('corpoTabelaAtendimentos');
  const tabelaConsultasPassadas = document.getElementById('corpoTabelaConsultasPassadas');

  if (pacienteData && pacienteData.nome) {
    nomePaciente.textContent = pacienteData.nome;

    if (prontuarioData.length > 0) {
      const ultimoAtendimento = prontuarioData[0];

      dataConsulta.textContent = formatarData(ultimoAtendimento.data_consulta);
      especialidade.textContent = ultimoAtendimento.especialidade;
      comentarios.textContent = ultimoAtendimento.comentarios;

      // Exibir histórico de atendimentos
      const rowsAtendimentos = prontuarioData.map(atendimento => {
        const { id, data_consulta, especialidade, status, comentarios } = atendimento;
        return `<tr>
                  <td>${formatarData(data_consulta)}</td>
                  <td>${especialidade}</td>
                  <td>${status}</td>
                  <td>${comentarios} <button onclick="editarComentarios(${id})">Editar</button></td>
                </tr>`;
      }).join('');
      tabelaAtendimentos.innerHTML = rowsAtendimentos;

      // Exibir consultas passadas
      const rowsConsultasPassadas = prontuarioData.map(consulta => {
        const { id, data_consulta, especialidade, status, comentarios } = consulta;
        return `<tr>
                  <td>${formatarData(data_consulta)}</td>
                  <td>${especialidade}</td>
                  <td>${status}</td>
                  <td>${comentarios} <button onclick="editarComentarios(${id})">Editar</button></td>
                </tr>`;
      }).join('');
      tabelaConsultasPassadas.innerHTML = rowsConsultasPassadas;
    } else {
      // Se não houver histórico de atendimentos
      dataConsulta.textContent = 'N/A';
      especialidade.textContent = 'N/A';
      comentarios.textContent = 'N/A';
      tabelaAtendimentos.innerHTML = '<tr><td colspan="4">Nenhum histórico de atendimentos disponível.</td></tr>';
      tabelaConsultasPassadas.innerHTML = '<tr><td colspan="4">Nenhuma consulta passada disponível.</td></tr>';
    }
  } else {
    // Se não houver informações do paciente
    const tabelaPaciente = document.getElementById('corpo-tabela-paciente');
    tabelaPaciente.innerHTML = '<tr><td colspan="7">Nenhuma informação do paciente disponível.</td></tr>';
  }
}

function formatarData(data) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(data).toLocaleDateString('pt-BR', options);
}

function obterPacienteIdDaURL() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('pacienteId');
}

async function editarComentarios(agendamentoId) {
  const novosComentarios = prompt('Digite os novos comentários:');
  if (novosComentarios !== null) {
    try {
      const response = await fetch(`/atualizar-comentarios/${agendamentoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({ comentarios: novosComentarios }),
      });

      const data = await response.json();

      if (!data.erro) {
        // Atualizar diretamente o conteúdo do elemento HTML associado ao comentário
        const comentariosElement = document.getElementById('comentarios');
        comentariosElement.textContent = novosComentarios;

        // Exibir mensagem de sucesso
        alert('Comentários atualizados com sucesso.');

        // Atualizar diretamente o histórico na tabela
        const tabelaAtendimentos = document.getElementById('corpoTabelaAtendimentos');
        const linhaAtendimento = tabelaAtendimentos.querySelector(`tr[data-agendamento-id="${agendamentoId}"]`);
        if (linhaAtendimento) {
          const comentariosTd = linhaAtendimento.querySelector('.comentarios');
          comentariosTd.textContent = novosComentarios;
        }
      } else {
        alert('Prontuário atualizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error);
      alert('Erro ao atualizar comentários. Verifique os dados e tente novamente.');
    }
  }
}