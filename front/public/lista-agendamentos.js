document.addEventListener("DOMContentLoaded", function () {
    const listaAgendamentos = document.getElementById('lista-agendamentos');
  
    // Aqui você deve buscar as consultas agendadas no servidor e preencher a lista.
    // Você pode usar fetch para obter os dados do servidor.
  
    // Exemplo de como adicionar um item à lista:
    const consultaItem = document.createElement('li');
    consultaItem.textContent = 'Consulta com Dr. Cardiologista em 2023-10-20 às 15:00';
    listaAgendamentos.appendChild(consultaItem);
  });
  