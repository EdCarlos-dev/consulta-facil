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

          // Salve o token, email e nome do médico no Local Storage
          localStorage.setItem('token', data.token);
          localStorage.setItem('emailMedico', email);
          localStorage.setItem('nomeMedico', data.medico.nome);

          // Adicione esta parte para verificar a expiração do token
          function verificarTokenExpirado() {
            const token = localStorage.getItem('token');
            if (token) {
              const tokenDecodificado = parseJwt(token);
              const agora = Math.floor(Date.now() / 1000);

              if (tokenDecodificado.exp < agora) {
                // Token expirado, faça o logout
                localStorage.removeItem('token');
                localStorage.removeItem('emailMedico');
                localStorage.removeItem('nomeMedico');
                window.location.href = '/loginMedico';
              }
            }
          }

          // Função auxiliar para decodificar o token JWT
          function parseJwt(token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split('')
                .map((char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
                .join('')
            );

            return JSON.parse(jsonPayload);
          }

          // Execute a verificação ao carregar a página
          verificarTokenExpirado();

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
