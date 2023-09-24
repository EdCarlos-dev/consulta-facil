// Certifique-se de que o DOM está carregado antes de executar o código
document.addEventListener('DOMContentLoaded', function () {
    // Selecione o formulário de pesquisa e o elemento do mapa
    const searchForm = document.querySelector('#search-form');
    const mapElement = document.querySelector('#map');
  
    // Função para inicializar e exibir o mapa
    function initMap() {
      // Coordenadas iniciais do mapa (por exemplo, coordenadas do centro da cidade)
      const initialCoords = { lat: -23.5505, lng: -46.6333 };
  
      // Opções do mapa
      const mapOptions = {
        center: initialCoords,
        zoom: 15, // Nível de zoom inicial
      };
  
      // Crie o mapa usando as opções e vincule-o ao elemento do mapa
      const map = new google.maps.Map(mapElement, mapOptions);
  
      // Adicione um marcador personalizado para a localização do paciente
      const patientMarker = new google.maps.Marker({
        position: initialCoords,
        map: map,
        title: 'Sua localização',
      });
  
      // Adicione um ouvinte de evento ao formulário de pesquisa
      searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
  
        // Obtenha o endereço inserido pelo usuário
        const address = document.querySelector('#endereco').value;
  
        // Use a API de Geocodificação do Google Maps para converter o endereço em coordenadas
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, function (results, status) {
          if (status === 'OK' && results[0]) {
            // Se as coordenadas forem encontradas, atualize o marcador no mapa
            const location = results[0].geometry.location;
            map.setCenter(location);
            patientMarker.setPosition(location);
          } else {
            // Se não for possível encontrar as coordenadas, exiba uma mensagem de erro
            alert('Endereço não encontrado. Tente novamente.');
          }
        });
      });
    }
  
    // Inicialize o mapa quando o DOM estiver carregado
    initMap();
  });
  