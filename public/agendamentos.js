document.addEventListener("DOMContentLoaded", function () {
  const listaAgendamentos = document.getElementById('lista-agendamentos');

  // Buscar as consultas agendadas no servidor
  fetch('/consultas-agendadas', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'), // Use o token armazenado localmente após o login
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        data.forEach((consulta) => {
          const consultaItem = document.createElement('li');
          consultaItem.textContent = `Consulta com ${consulta.especialidade} em ${consulta.data_consulta}`;
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
