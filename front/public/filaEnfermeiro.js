document.addEventListener("DOMContentLoaded", function () {
  const listaFila = document.getElementById('lista-fila');

  // Limpe a lista de pacientes na fila
  listaFila.innerHTML = '';

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

        // Crie um item da lista com as informações do paciente e da consulta
        const pacienteItem = document.createElement('li');
        pacienteItem.textContent = `Paciente: ${paciente.nome} - Consulta em ${new Date(pacienteAgendamento.data_consulta).toLocaleString()}`;
        listaFila.appendChild(pacienteItem);
      });
    } else {
      const pacienteItem = document.createElement('li');
      pacienteItem.textContent = 'Nenhum paciente na fila de atendimento.';
      listaFila.appendChild(pacienteItem);
    }
  })
  .catch((error) => {
    console.error('Erro ao buscar pacientes na fila:', error);
  });
});