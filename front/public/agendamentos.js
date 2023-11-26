document.addEventListener("DOMContentLoaded", function () {
  const tabelaAgendamentos = document.getElementById('tabela-agendamentos');
  const listaAgendamentos = document.getElementById('lista-agendamentos');

  // Limpe a lista de agendamentos
  listaAgendamentos.innerHTML = '';

  // Buscar as consultas agendadas no servidor
  fetch('/consultas-agendadas', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    },
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.length > 0) {
      // Ordenar as consultas por data (mais próxima primeiro)
      const consultasOrdenadas = data.sort((a, b) => new Date(a.data_consulta) - new Date(b.data_consulta));

      consultasOrdenadas.forEach((consulta) => {
        const row = listaAgendamentos.insertRow();
        const cellDataHora = row.insertCell(0);
        const cellEspecialidade = row.insertCell(1);

        cellDataHora.textContent = new Date(consulta.data_consulta).toLocaleString();
        cellEspecialidade.textContent = consulta.especialidade;
      });

      // Adicionar a tabela ao DOM
      tabelaAgendamentos.style.display = 'table';
    } else {
      const row = listaAgendamentos.insertRow();
      const cellMensagem = row.insertCell(0);

      cellMensagem.colSpan = 2;
      cellMensagem.textContent = 'Nenhuma consulta agendada.';
    }
  })
  .catch((error) => {
    console.error('Erro ao buscar consultas agendadas:', error);
  });
});
