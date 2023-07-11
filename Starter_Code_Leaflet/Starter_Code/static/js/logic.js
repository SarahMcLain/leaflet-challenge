// Creating map object
function createMap() {
    let myMap = L.map("map", {
        center: [0,0],
        zoom: 2
        
    });

    // adding the tile layer
    let tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap)

    return myMap
};
// function creating circle markers 
function createMarkers(response) {
    let markers = L.layerGroup();
    
    for (let i = 0; i < response.features.length; i++) {
        let feature = response.features[i];
        let location = feature.geometry;

        if (location) {
            let magnitude = feature.properties.mag;
            let depth = location.coordinates[2];
            let place = feature.properties.place;
            let title = feature.properties.title;

            let marker = L.circleMarker([location.coordinates[1], location.coordinates[0]], {
                radius: magnitude * 6, 
                fillColor: getColor(depth), 
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).bindPopup(`<h3>${title}</h3><h4>Location: ${place}</h4><h4>Magnitude: ${magnitude}</h4><h4>Depth: ${depth}</h4>`);

            markers.addLayer(marker);
        }
    }

    return markers;
}

// colors for each marker based on the depth of the earthquake.
function getColor(depth) {
    let color;
  if (depth >= 40) {
    color = "#FF0000"; // Red for biggest depth
  } else if (depth >= 30 && depth < 40) {
    color = "#FFA500"; // Orange
  } else if (depth >= 20 && depth < 30) {
    color = "#FFFF00"; // Yellow
  } else if (depth >= 10 && depth < 20) {
    color = "#00FF00"; // Green
  } else {
    color = "#0000FF"; // Blue for smallest depth
  }
  return color;
  }

// Create a legend for the map
function createLegend(myMap, depths) {
    let legend = L.control({ position: "bottomright" });
  
    legend.onAdd = function (map) {
      let div = L.DomUtil.create("div", "legend");
      let labels = ["<strong>Earthquake Depth</strong>"];
  
      for (let i = 0; i < depths.length; i++) {
        let range = depths[i] + (depths[i + 1] ? "&ndash;" + depths[i + 1] : "+");
        let color = getColor(depths[i] + 1);
  
        div.innerHTML += `
          <div class="legend-row">
            <i style="background:${color}"></i>
            <div>${range}</div>
          </div>
        `;
      }
  
      div.innerHTML = labels.join("<br>") + div.innerHTML;
      return div;
    };
  
    legend.addTo(myMap);
  }
  
    
 

// getting the data with API call using d3
function getData() {
// calling the baseline url
    let baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
    return d3.json(baseURL)
    
};

// log the data and add it to the map
getData().then(function(response) {
    console.log(response);
    let myMap = createMap();
    let markers = createMarkers(response);
    let depths = [0, 10, 20, 30, 40];

    myMap.addLayer(markers);
    createLegend(myMap, depths);
});
