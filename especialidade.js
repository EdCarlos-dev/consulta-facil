document.addEventListener("DOMContentLoaded", function () {
    // Array de especialidades médicas (você pode adicionar mais)
    const especialidades = [
      "Cardiologia",
      "Dermatologia",
      "Ortopedia",
      "Pediatria",
      "Ginecologia",
      "Neurologia",
      // Adicione mais especialidades aqui
    ];
  
    const inputEspecialidade = document.getElementById('especialidade');
    const listaEspecialidades = document.getElementById('lista-especialidade');
  
    // Função para atualizar a lista de especialidades com base no texto digitado
    function atualizarListaEspecialidades() {
      const filtro = inputEspecialidade.value.toLowerCase();
      const especialidadesFiltradas = especialidades.filter(especialidade => especialidade.toLowerCase().includes(filtro));
  
      // Limpa a lista de especialidades antes de atualizar
      listaEspecialidades.innerHTML = '';
  
      especialidadesFiltradas.forEach(especialidade => {
        const item = document.createElement('div');
        item.textContent = especialidade;
        // Adicione um evento de clique para preencher o campo de especialidade com a opção clicada
        item.addEventListener('click', () => {
          inputEspecialidade.value = especialidade;
          // Opcional: esconde a lista de especialidades após a seleção
          listaEspecialidades.innerHTML = '';
        });
        listaEspecialidades.appendChild(item);
      });
    }
  
    // Adiciona um ouvinte de eventos ao campo de entrada
    inputEspecialidade.addEventListener('input', atualizarListaEspecialidades);
  
    // Inicializa a lista de especialidades
    atualizarListaEspecialidades();
  });
  