window.onload = function() {

  var capaSatelite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmFjdW5kb2JheWxlIiwiYSI6ImNqMnpkNzR4ODAwNDIyd3BybHVxbXk3emEifQ.sVR0_Ckb1UjZ1OUTCaFPnw", {
      attribution: 'Imágenes de <a href="http://www.mapbox.com/">Mapbox</a>.',
  });

  var map = L.map('map', {
    center: [-25.291748, -57.521255], zoom: 12,
    layers: [capaSatelite]
  });


  var paletteColors = {
    'SECOND_COLOR': '#fdcc8a',
    'THIRD_COLOR': '#fc8d59',
    'FOUR_COLOR': '#e34a33',
    'FIVE_COLOR': '#b30000'
  };

  var geoJsonLayer = new L.GeoJSON.AJAX("data/techo_py_preliminar.geojson", {
      style: function(feature) {
          if (feature.properties.prob >= 0.8 && feature.properties.prob <= 0.85) {
              return {color: paletteColors.SECOND_COLOR};
          } else if (feature.properties.prob >= 0.85 && feature.properties.prob <= 0.90) {
            return {color: paletteColors.THIRD_COLOR};
          } else if (feature.properties.prob >= 0.90 && feature.properties.prob <= 0.95) {
            return {color: paletteColors.FOUR_COLOR};
          } else if (feature.properties.prob >= 0.95 && feature.properties.prob <= 1) {
            return {color: paletteColors.FIVE_COLOR}; 
          }
      }
  }).addTo(map);

  var GooglePlacesSearchBox = L.Control.extend({
    onAdd: function() {
      var element = document.getElementById("searchBox");
      return element;
    }
  });

  (new GooglePlacesSearchBox).addTo(map);

  var input = document.getElementById("searchBox");
  input.setAttribute('placeholder', 'Buscar en el mapa');

  var searchBox = new google.maps.places.SearchBox(input);

  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    places.forEach(function(place) {

      var lat = place.geometry.location.lat(),
          lang = place.geometry.location.lng();

      map.setView(new L.LatLng(lat, lang), 11);
    });

  });
}


