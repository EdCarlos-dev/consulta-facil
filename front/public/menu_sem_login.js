document.addEventListener("DOMContentLoaded", function () {
  // Recupera o elemento <nav> onde o menu será gerado
  const navElement = document.querySelector('nav');

  // Define os itens do menu em um objeto
  const menuItems = [
    
    {text: 'Login', link:'/login'},
    { text: 'Cadastro', link: '/cadastro' },
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

  

  // Adicione um evento de clique para o botão "Sair" (Você pode ajustar o tratamento do logout)

});

  