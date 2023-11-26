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
          // Adicione um evento para salvar os comentários no backend quando o enfermeiro inserir algo
          inputComentarios.addEventListener('change', async () => {
            await fetch(`/salvar-comentarios/${pacienteAgendamento.id}`, {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ comentarios: inputComentarios.value }),
            });
          });
          colunaComentarios.appendChild(inputComentarios);
          linhaTabela.appendChild(colunaComentarios);

          corpoTabelaFila.appendChild(linhaTabela);
        });
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
