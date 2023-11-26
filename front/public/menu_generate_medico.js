document.addEventListener("DOMContentLoaded", function () {
  // Recupera o elemento <nav> onde o menu será gerado
  const navElement = document.querySelector('nav');

  // Define os itens do menu em um objeto
  const menuItems = [

    { text: 'Meu Atendimento', link: '/atendimentoMedico.html' },
    { text: 'Prontuário Médico', link: '/prontuariomedico.html' },
    
  ];

  // Cria uma lista não ordenada <ul> para os itens do menu
  const ulElement = document.createElement('ul');

  // Itera sobre os itens do menu e cria os elementos de lista <li> e <a>
  menuItems.forEach(item => {
    const liElement = document.createElement('li');
    const aElement = document.createElement('a');
    aElement.textContent = item.text;
    aElement.href = item.link;
    liElement.appendChild(aElement);
    ulElement.appendChild(liElement);
  });

  // Adiciona a lista de itens do menu ao elemento <nav>
  navElement.appendChild(ulElement);

  // Adicione o botão "Sair" como um item do menu
  const logoutButton = document.createElement('li');
  const logoutLink = document.createElement('a');
  logoutLink.textContent = 'Sair';
  logoutLink.href = '/login'; // Você pode definir um link '#' para simular o logout
  logoutButton.appendChild(logoutLink);
  ulElement.appendChild(logoutButton);

  // Adicione um evento de clique para o botão "Sair" (Você pode ajustar o tratamento do logout)
  logoutLink.addEventListener('click', function (event) {
    event.preventDefault();
    // Execute a lógica de logout aqui, por exemplo, removendo o token do Local Storage.
    localStorage.removeItem('token');
    // Redirecione o usuário para a página de login
    window.location.href = '/loginMedico.html';
  });
});

  