document.addEventListener("DOMContentLoaded", function () {
    const consultaForm = document.getElementById('consulta-form');
  
    consultaForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const especialidade = document.getElementById('especialidade').value;
      const data = document.getElementById('data').value;
      const hora = document.getElementById('hora').value;
  
      // Aqui você pode enviar os dados da consulta para o servidor (por exemplo, via fetch) para salvar no banco de dados.

      
      // Certifique-se de que o servidor tenha uma rota para receber esses dados.
  
      // Limpe o formulário após a marcação da consulta
      consultaForm.reset();
    });
  });
  