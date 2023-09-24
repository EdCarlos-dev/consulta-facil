document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('#login-form');
  const loginMessage = document.querySelector('#login-message');

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;

    // Crie um objeto com os dados do formulário
    const formData = {
      email: email,
      senha: senha,
    };

    // Faça uma solicitação POST para a rota /api/login no servidor
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Autenticação bem-sucedida, redirecione o usuário ou execute ações necessárias
          loginMessage.textContent = 'Autenticação bem-sucedida. Redirecionando para a página de perfil...';
          setTimeout(function () {
            window.location.href = '/perfil.html'; // Redirecionar para a página de perfil
          }, 2000); // Redirecionar após 2 segundos
        } else {
          // Exiba uma mensagem de erro para o usuário
          loginMessage.textContent = 'Credenciais inválidas. Tente novamente.';
        }
      })
      .catch((error) => {
        console.error('Erro na solicitação:', error);
      });
  });
});
