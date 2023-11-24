document.addEventListener("DOMContentLoaded", function () {
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
        const consultaItem = document.createElement('li');
        consultaItem.textContent = `Consulta com ${consulta.especialidade} em ${new Date(consulta.data_consulta).toLocaleString()}`;
        listaAgendamentos.appendChild(consultaItem);
      });
    } else {
      const consultaItem = document.createElement('li');
      consultaItem.textContent = 'Nenhuma consulta agendada.';
      listaAgendamentos.appendChild(consultaItem);
    }
  })
  .catch((error) => {
    console.error('Erro ao buscar consultas agendadas:', error);
  });
});