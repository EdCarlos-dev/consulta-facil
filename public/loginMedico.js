document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('#login-form');
    const loginMessage = document.querySelector('#login-message');
  
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const email = document.querySelector('#email').value;
      const senha = document.querySelector('#senha').value;
  
      const formData = {
        email: email,
        senha: senha,
      };
  
      fetch('/login-medico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.erro) {
            loginMessage.textContent = data.mensagem;
          } else {
            loginMessage.textContent = 'Autenticação bem-sucedida.';
  
            localStorage.setItem('token', data.token);
            localStorage.setItem('emailMedico', email);
            localStorage.setItem('nomeMedico', data.medico.nome);
  
            setTimeout(function () {
              window.location.href = 'perfil-medico';
            }, 2000);
          }
        })
        .catch((error) => {
          console.error('Erro na solicitação:', error);
        });
    });
  });
  