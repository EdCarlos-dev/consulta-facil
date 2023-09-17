document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("#login form");
  
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const email = document.querySelector("#email-login").value;
      const senha = document.querySelector("#senha-login").value;
  
      // Aqui você pode enviar uma solicitação AJAX para o servidor para autenticar o paciente
      // e lidar com o CRUD do paciente com base na resposta do servidor.
  
      // Exemplo de como enviar uma solicitação AJAX usando a função fetch:
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Verificar a resposta do servidor e tomar as ações apropriadas, como redirecionar para a página de perfil do paciente em caso de sucesso.
          if (data.success) {
            // Redirecionar para a página do paciente ou realizar outras ações necessárias
            window.location.href = "/perfil.html";
          } else {
            // Exibir uma mensagem de erro de login
            alert("Login falhou. Verifique seu email e senha.");
          }
        })
        .catch((error) => {
          console.error("Erro ao fazer login:", error);
          // Tratar erros de comunicação com o servidor ou outros erros
        });
    });
  });
  