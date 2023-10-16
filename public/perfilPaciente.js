// Função para atualizar o perfil do paciente com as informações fornecidas
function atualizarPerfil() {
  // Obtenha os valores dos campos
  const nome = document.getElementById('nome').value;
  const endereco = document.getElementById('endereco').value;
  const pais = document.getElementById('pais').value;
  const cep = document.getElementById('cep').value;
  const rua = document.getElementById('rua').value;
  const numero = document.getElementById('numero').value;
  const complemento = document.getElementById('complemento').value;
  const rg = document.getElementById('rg').value;
  const cpf = document.getElementById('cpf').value;

  // Atualize o perfil com as informações
  const perfilNome = document.getElementById('perfilNome');
  perfilNome.innerHTML = `<b>Olá, ${nome}</b>`;

   // Realize a validação dos campos
   if (nome.trim() === '' || email.trim() === '' || rua.trim() === '' || numero.trim() === '' || cep.trim() === '' || rg.trim() === '' || cpf.trim() === '')  {
    alert('Preencha todos os campos obrigatórios.');
  } else {
    // Se os campos obrigatórios estiverem preenchidos, atualize o perfil
    const perfilNome = document.getElementById('perfilNome');
    perfilNome.innerHTML = `<b>Olá, ${nome}</b>`;

    // Exiba uma mensagem de sucesso
    alert('Perfil atualizado com sucesso!');
  }
}

// Adicione um ouvinte de evento para o botão "Atualizar"
const atualizarButton = document.getElementById('atualizarButton');
atualizarButton.addEventListener('click', atualizarPerfil);

// Adicione um ouvinte de evento para o botão "Trocar Imagem"
const trocarImagemButton = document.getElementById('trocarImagemButton');
const inputImagem = document.getElementById('inputImagem');
const fotoPerfil = document.getElementById('fotoPerfil');

trocarImagemButton.addEventListener('click', () => {
  inputImagem.click();
});

inputImagem.addEventListener('change', (event) => {
  const imagemSelecionada = event.target.files[0];

  if (imagemSelecionada) {
    const reader = new FileReader();

    reader.onload = (e) => {
      fotoPerfil.src = e.target.result;
    };

    reader.readAsDataURL(imagemSelecionada);
  }
});
