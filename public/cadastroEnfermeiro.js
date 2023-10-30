document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;
      const coren = document.getElementById('CRM').value;
      
     
  
      // Faça o tratamento dos dados e envio do formulário para o servidor
      // Exemplo: você pode criar uma instância de um objeto "Médico" com os dados fornecidos e enviá-lo para o servidor
  
      // Limpar os campos do formulário
      form.reset();
    });
  });
  