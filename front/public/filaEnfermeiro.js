document.addEventListener("DOMContentLoaded", function () {
  const corpoTabelaFila = document.getElementById('corpo-tabela-fila');

  // Limpe o corpo da tabela de pacientes na fila
  corpoTabelaFila.innerHTML = '';

  // Buscar os pacientes na fila no servidor para a semana atual
  fetch('/fila-enfermeiro', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        // Ordenar os pacientes por data da consulta (mais próxima primeiro)
        const pacientesOrdenados = data.sort((a, b) => new Date(a.data_consulta) - new Date(b.data_consulta));

        pacientesOrdenados.forEach(async (pacienteAgendamento) => {
          // Busque as informações do paciente associado ao agendamento
          const response = await fetch(`/pacientes/${pacienteAgendamento.paciente_id}`, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
          });

          const paciente = await response.json();

          // Crie uma linha na tabela com as informações do paciente e da consulta
          const linhaTabela = document.createElement('tr');

          const colunaPaciente = document.createElement('td');
          colunaPaciente.textContent = paciente.nome;
          linhaTabela.appendChild(colunaPaciente);

          const colunaDataConsulta = document.createElement('td');
          colunaDataConsulta.textContent = new Date(pacienteAgendamento.data_consulta).toLocaleString();
          linhaTabela.appendChild(colunaDataConsulta);

          const colunaEspecialidade = document.createElement('td');
          colunaEspecialidade.textContent = pacienteAgendamento.especialidade;
          linhaTabela.appendChild(colunaEspecialidade);

          const colunaComentarios = document.createElement('td');
          const inputComentarios = document.createElement('input');
          inputComentarios.type = 'text';
          inputComentarios.placeholder = 'Adicione comentários';
          inputComentarios.id = `comentarios-${pacienteAgendamento.id}`; // Adiciona um ID único para cada campo
          colunaComentarios.appendChild(inputComentarios);

          // Adiciona um botão para salvar comentários
          const botaoSalvar = document.createElement('button');
          botaoSalvar.textContent = 'Salvar Comentário';
          botaoSalvar.addEventListener('click', () => salvarComentario(pacienteAgendamento.id, paciente.id));
          colunaComentarios.appendChild(botaoSalvar);

          linhaTabela.appendChild(colunaComentarios);

          corpoTabelaFila.appendChild(linhaTabela);
        });

        // Ordenar a tabela com base na data da consulta
        sortTableByDate();
      } else {
        // Se não houver pacientes na fila, adicione uma linha indicando isso
        const linhaVazia = document.createElement('tr');
        const colunaVazia = document.createElement('td');
        colunaVazia.colSpan = 4; // Ocupa todas as colunas disponíveis
        colunaVazia.textContent = 'Nenhum paciente na fila de atendimento.';
        linhaVazia.appendChild(colunaVazia);

        corpoTabelaFila.appendChild(linhaVazia);
      }
    })
    .catch((error) => {
      console.error('Erro ao buscar pacientes na fila:', error);
    });
});

function sortTableByDate() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("tabela-fila");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[1].textContent;
      y = rows[i + 1].getElementsByTagName("td")[1].textContent;
      x = new Date(x).getTime();
      y = new Date(y).getTime();
      if (x > y) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

async function salvarComentario(agendamentoId, pacienteId) {
  try {
    const comentarios = document.getElementById(`comentarios-${agendamentoId}`).value;

    // Enviar os comentários para o servidor
    const response = await fetch(`/salvar-comentarios-prontuario/${pacienteId}/${agendamentoId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ comentarios }),
    });

    const data = await response.json();

    if (data.erro) {
      console.error('Erro ao salvar comentários:', data.mensagem);
    } else {
      alert('Comentários salvos com sucesso.');

      // Adicione a linha abaixo para redirecionar para prontuarioMedico.html do paciente
      window.location.href = `/prontuarioMedico.html?pacienteId=${pacienteId}`;
    }
  } catch (error) {
    console.error('Erro ao salvar comentários:', error);
    alert('Erro ao salvar comentários. Verifique a conexão e tente novamente.');
  }
}
