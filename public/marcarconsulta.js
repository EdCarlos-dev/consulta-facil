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
      // Aqui você pode enviar os dados da consulta para o servidor (por exemplo, via fetch) para salvar no banco de dados.
      // Certifique-se de que o servidor tenha uma rota para receber esses dados.
      erroDataHora.textContent = ''; // Limpe a mensagem de erro
      consultaForm.reset(); // Limpe o formulário após a marcação da consulta
    }
  });
});