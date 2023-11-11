document.addEventListener("DOMContentLoaded", function () {
  const consultaForm = document.getElementById('consulta-form');
  const erroDataHora = document.getElementById('erro-data-hora');

  consultaForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const especialidade = document.getElementById('especialidade').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;

    // Validação da data e hora
    const dataHoraAtual = new Date();
    const dataAgendada = new Date(data + 'T' + hora);

    if (dataAgendada <= dataHoraAtual) {
      erroDataHora.textContent = 'A data e hora da consulta devem ser futuras.';
    } else {
      erroDataHora.textContent = ''; // Limpe a mensagem de erro

      // Prepare os dados para enviar ao servidor
      const dadosConsulta = {
        especialidade,
        data,
        hora,
      };

      // Envie os dados da consulta para o servidor
      fetch('/marcar-consulta', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'), // // Use o token armazenado localmente após o login
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosConsulta),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.erro === false) {
          // Limpe o formulário após a marcação da consulta
          consultaForm.reset();
        } else {
          erroDataHora.textContent = data.mensagem;
        }
      })
      .catch((error) => {
        console.error('Erro ao marcar consulta:', error);
        erroDataHora.textContent = 'Erro ao marcar consulta. Tente novamente mais tarde.';
      });
  }
});
});

 // Sincronize a tabela com o banco de dados e aplique quaisquer alterações necessárias.
 Agendamentos.sync({ alter: true });

 module.exports = Agendamentos;
