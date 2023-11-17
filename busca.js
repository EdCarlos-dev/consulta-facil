// busca.js
document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('search-form');
  const mapElement = document.getElementById('map');
  const trackLocationButton = document.getElementById('track-location');

  // Function to initialize the map
  function initMap() {
    const map = new google.maps.Map(mapElement, {
      center: { lat: -34.397, lng: 150.644 }, // Default center (you can adjust)
      zoom: 12, // Adjust the initial zoom level
    });

    // Set up a marker for the user's location
    const userMarker = new google.maps.Marker({
      map: map,
      title: 'Your Location',
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // Customize the marker icon
    });

    // Get the user's location and update the marker
    trackLocationButton.addEventListener('click', function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            // Update the marker position and map center
            userMarker.setPosition(userLocation);
            map.setCenter(userLocation);

            // Call the function to search for medical facilities
            searchMedicalFacilities(userLocation);
          },
          function (error) {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    });
  }

  // Function to search for medical facilities using OpenStreetMap Nominatim API
  function searchMedicalFacilities(userLocation) {
    const radius = 5; // Radius in kilometers
    const baseUrl = 'https://nominatim.openstreetmap.org/search';
    const searchQuery =
      'clinica OR hospital OR UBS'; // Adjust the query based on your needs

    // Construct the API URL
    const apiUrl = `${baseUrl}?q=${searchQuery}&format=json&limit=10&dedupe=1&viewbox=${userLocation.lng - 0.05},${userLocation.lat - 0.05},${userLocation.lng + 0.05},${userLocation.lat + 0.05}&bounded=1`;

    // Make a GET request to the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Process the data and display markers on the map
        data.forEach((result) => {
          const marker = new google.maps.Marker({
            position: { lat: parseFloat(result.lat), lng: parseFloat(result.lon) },
            map: map,
            title: result.display_name,
          });
        });
      })
      .catch((error) => {
        console.error('Error fetching medical facilities:', error);
      });
  }

  // Initialize the map
  initMap();
});
