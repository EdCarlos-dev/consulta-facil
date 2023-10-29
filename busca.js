// Certifique-se de que o DOM está carregado antes de executar o código
document.addEventListener('DOMContentLoaded', function () {
  // Selecione o formulário de pesquisa e o elemento do mapa
  const searchForm = document.querySelector('#search-form');
  const mapElement = document.querySelector('#map');

  // Função para inicializar e exibir o mapa
  function initMap() {
    // Verifique se o navegador suporta geolocalização
    if ('geolocation' in navigator) {
      // Solicitar permissão para acessar a localização do usuário
      navigator.geolocation.getCurrentPosition(function (position) {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Coordenadas iniciais do mapa (por exemplo, coordenadas do centro da cidade)
        const initialCoords = userLocation;

        // Opções do mapa
        const mapOptions = {
          center: initialCoords,
          zoom: 15, // Nível de zoom inicial
        };

        // Crie o mapa usando as opções e vincule-o ao elemento do mapa
        const map = new google.maps.Map(mapElement, mapOptions);

        // Adicione um marcador para a localização do usuário
        new google.maps.Marker({
          position: userLocation,
          map: map,
          title: 'Sua localização',
        });

        // Adicione um ouvinte de evento ao formulário de pesquisa
        searchForm.addEventListener('submit', function (event) {
          event.preventDefault();

          // Obtenha o tipo de lugar (exemplo: hospital, clínica)
          const placeType = 'hospital'; // Você pode ajustar isso de acordo com sua necessidade

          // Use a API de Places do Google Maps para encontrar lugares próximos
          const placesService = new google.maps.places.PlacesService(map);

          placesService.nearbySearch(
            {
              location: userLocation,
              radius: 5000, // Raio em metros
              type: [placeType],
            },
            function (results, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                // Limpe qualquer marcador anterior
                results.forEach(function (place) {
                  const marker = new google.maps.Marker({
                    position: place.geometry.location,
                    map: map,
                    title: place.name,
                  });
                });
              }
            }
          );
        });
      });
    } else {
      alert('A geolocalização não é suportada neste navegador.');
    }
  }

  // Inicialize o mapa quando o DOM estiver carregado
  initMap();
});
