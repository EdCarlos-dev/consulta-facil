document.addEventListener("DOMContentLoaded", function () {
  // Recupera o elemento do perfilNome
  const perfilNomeElement = document.getElementById('nomePaciente');

  // Verifica se o nome do paciente está no Local Storage
  const nomePaciente = localStorage.getItem('nomePaciente');

  // Atualiza o texto dentro do elemento nomePaciente no cabeçalho
  if (perfilNomeElement && nomePaciente) {
    perfilNomeElement.textContent = `${nomePaciente}`;
  } else {
    // Define um valor padrão caso o nome do paciente não seja encontrado no Local Storage ou se o elemento não existir
    perfilNomeElement.textContent = 'Olá, Paciente';
  }

  // Recupera o elemento <nav> onde o menu será gerado
  const navElement = document.querySelector('nav');

  // Cria um div para agrupar o texto de saudação e o menu
  const menuContainer = document.createElement('div');
  menuContainer.classList.add('menu-container'); // Adiciona uma classe para estilização (opcional)

  // Adiciona o texto de saudação ao menuContainer
  menuContainer.appendChild(perfilNomeElement);

  // Define os itens do menu em um objeto
  const menuItems = [
    { text: 'Meu Perfil', link: '/perfilPaciente' },
    { text: 'Busca', link: '/busca' },
    { text: 'Medicamentos', link: '/medicamentos' },
    { text: 'Marcar consulta', link: '/marcar-consulta' },
    { text: 'Agendamentos', link: '/agendamentos' }
    
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

  // Adiciona a lista de itens do menu ao menuContainer
  menuContainer.appendChild(ulElement);

  // Adiciona o menuContainer ao elemento <nav>
  navElement.appendChild(menuContainer);

  // Restante do seu código...
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
    window.location.href = '/login.html';
  });
});




