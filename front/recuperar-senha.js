document.addEventListener("DOMContentLoaded", function () {
    const recuperarSenhaForm = document.getElementById("recuperar-senha-form");
    const mensagemRecuperacaoSenha = document.getElementById("recuperar-senha-message");
  
    recuperarSenhaForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const emailRecuperarSenha = document.getElementById("email-recuperar-senha").value;
  
      // Enviar o email para o servidor para iniciar o processo de recuperação de senha
      enviarEmailRecuperacaoSenha(emailRecuperarSenha);
    });
  
    function enviarEmailRecuperacaoSenha(email) {
      // Aqui, você deve fazer uma solicitação para o servidor para enviar um email de recuperação de senha
      // Você pode usar uma biblioteca como Axios ou fetch para fazer a solicitação HTTP
      // Por simplicidade, vamos apenas simular o envio de email com um timeout
  
      mensagemRecuperacaoSenha.textContent = "Enviando email de recuperação...";
  
      setTimeout(function () {
        mensagemRecuperacaoSenha.textContent = "Um email de recuperação foi enviado para " + email;
      }, 2000);
    }
  });
  