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

  // Exiba uma mensagem de sucesso
  alert('Perfil atualizado com sucesso!');
}

// Adicione um ouvinte de evento para o botão "Atualizar"
const atualizarButton = document.getElementById('atualizarButton');
atualizarButton.addEventListener('click', atualizarPerfil);

