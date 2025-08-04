// Function to navigate back to the previous page
function goBack() {
  window.history.back();
}


// Airport Data
const airports = [
  //NEPAL
{ name: "Kathmandu Tribhuvan", code: "KTM", lat: 27.7017, lon: 85.3583 },

  //NEIGHBOUR
{ name: "Delhi Indira Gandhi", code: "DEL", lat: 28.5562, lon: 77.1000 },
{ name: "Mumbai Chhatrapati Shivaji", code: "BOM", lat: 19.0886, lon: 72.8679 }, 
{ name: "Bengaluru Kempegowda", code: "BLR", lat: 13.1986, lon: 77.7066 },
{ name: "Kolkata Netaji Subhas Chandra Bose", code: "CCU", lat: 22.6540, lon: 88.4466 },

{ name: "Paro Airport", code: "PBH", lat: 27.4030, lon: 89.4241 },
{ name: "Dhaka Hazrat Shahjalal", code: "DAC", lat: 23.8431, lon: 90.3970 },

{ name: "Chengdu Shuangliu", code: "CTU", lat: 30.5783, lon: 103.9464 },
{ name: "Guangzhou Baiyun", code: "CAN", lat: 23.3925, lon: 113.2988 },
{ name: "Kunming Changshui", code: "KMG", lat: 25.1010, lon: 102.9296 },

  //NORTH/EAST ASIA
{ name: "Tokyo Narita", code: "NRT", lat: 35.7719, lon: 140.3928 },
{ name: "Seoul Incheon", code: "ICN", lat: 37.4602, lon: 126.4407 },
{ name: "Hong Kong Chek Lap Kok", code: "HKG", lat: 22.3080, lon: 113.9185 },

  //SOUTH ASIA
{ name: "Colombo Bandaranaike", code: "CMB", lat: 7.1808, lon: 79.8843 },
{ name: "Bangkok Suvarnabhumi", code: "BKK", lat: 13.6900, lon: 100.7500 },
{ name: "Bangkok Don Mueng", code: "DMK", lat: 13.9126, lon: 100.6073 }, 
{ name: "Kuala Lumpur International", code: "KUL", lat: 2.7456, lon: 101.709 },
{ name: "Singapore Changi", code: "SIN", lat: 1.3644, lon: 103.9915 },

  //MIDDLE EAST
{ name: "Doha Hamad", code: "DOH", lat: 25.276987, lon: 51.5650 },
{ name: "Dubai International", code: "DXB", lat: 25.276987, lon: 55.396282 },
{ name: "Abu Dhabi International", code: "AUH", lat: 24.4338, lon: 54.6512 },
{ name: "Sharjah International", code: "SHJ", lat: 25.2480, lon: 55.4023 },

{ name: "Kuwait International", code: "KWI", lat: 29.2266, lon: 47.9681 },
{ name: "Dammam King Fahd", code: "DMM", lat: 26.4333, lon: 49.7833 },        

  //EUROPE    
{ name: "London Heathrow", code: "LHR", lat: 51.470020, lon: -0.454295 },
{ name: "Paris Charles de Gaulle", code: "CDG", lat: 49.0097, lon: 2.5479 },
{ name: "Frankfurt am Main", code: "FRA", lat: 50.0333, lon: 8.5706 },
{ name: "Amsterdam Schiphol", code: "AMS", lat: 52.3105, lon: 4.7683 },
{ name: "Istanbul Airport", code: "IST", lat: 41.2747, lon: 28.7532 },
{ name: "Rome Fiumicino", code: "FCO", lat: 41.8003, lon: 12.2389 },
{ name: "Madrid Barajas", code: "MAD", lat: 40.4719, lon: -3.5626 },

  //NORTH AMERICA
{ name: "New York JFK", code: "JFK", lat: 40.641766, lon: -73.780968 },
{ name: "Los Angeles LAX", code: "LAX", lat: 33.941589, lon: -118.408530 },
{ name: "San Francisco International", code: "SFO", lat: 37.6213, lon: -122.3790 },
{ name: "George Bush Intercontinental", code: "IAH", lat: 29.9844, lon: -95.3414 },
{ name: "Dallas/Fort Worth International", code: "DFW", lat: 32.8998, lon: -97.0403 },
{ name: "Chicago O'Hare", code: "ORD", lat: 41.9742, lon: -87.9073 },
{ name: "Washington Dulles", code: "IAD", lat: 38.9531, lon: -77.4565 },
{ name: "Toronto Pearson", code: "YYZ", lat: 43.6777, lon: -79.6248 },
{ name: "Montreal Pierre Elliott Trudeau", code: "YUL", lat: 45.4706, lon: -73.7407 },
{ name: "Vancouver International", code: "YVR", lat: 49.1937, lon: -123.1839 }

];

// Initialize Map
const map = L.map("map").setView([20, 0], 2);

// Satellite Basemap Layer
L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: "Tiles © Esri",
    maxZoom: 18,
  }
).addTo(map);

// Populate Dropdowns
const originSelect = document.getElementById("origin");
const destSelect = document.getElementById("destination");

airports.forEach((airport) => {
  const opt1 = document.createElement("option");
  opt1.value = `${airport.lat},${airport.lon}`;
  opt1.text = `${airport.name} (${airport.code})`;
  originSelect.appendChild(opt1);

  const opt2 = opt1.cloneNode(true);
  destSelect.appendChild(opt2);
});

// Route and Marker Layer Group
const layerGroup = L.layerGroup().addTo(map);

// Handle Button Click
document.getElementById("showRoute").addEventListener("click", () => {
  const originVal = originSelect.value;
  const destVal = destSelect.value;

  if (!originVal || !destVal) {
    alert("Please select both origin and destination.");
    return;
  }

  const [lat1, lon1] = originVal.split(",").map(Number);
  const [lat2, lon2] = destVal.split(",").map(Number);

  // Haversine Formula
  const R = 6371;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.asin(Math.sqrt(a));
  const distance = (R * c).toFixed(2);

  // Update UI
  document.getElementById("origin-name").textContent =
    originSelect.options[originSelect.selectedIndex].text;
  document.getElementById("destination-name").textContent =
    destSelect.options[destSelect.selectedIndex].text;
  document.getElementById("distance").textContent = `${distance} km`;

  // Update Map
  layerGroup.clearLayers();

  const originMarker = L.marker([lat1, lon1]).bindPopup("Origin").addTo(layerGroup);
  const destMarker = L.marker([lat2, lon2]).bindPopup("Destination").addTo(layerGroup);

  const route = L.polyline(
    [
      [lat1, lon1],
      [lat2, lon2],
    ],
    { color: "red", weight: 4 }
  ).addTo(layerGroup);

  map.fitBounds(route.getBounds(), { padding: [50, 50] });
});

const originDropdown = document.getElementById("origin");
  const destinationDropdown = document.getElementById("destination");

  airports.forEach((airport) => {
    const option = document.createElement("option");
    option.value = `${airport.lat},${airport.lon}`;
    option.text = `${airport.name} (${airport.code})`;
    originDropdown.appendChild(option);

    const destinationOption = option.cloneNode(true);
    destinationDropdown.appendChild(destinationOption);
  });

  document.getElementById("origin-name").innerText =
      originDropdown.options[originDropdown.selectedIndex].text;
    document.getElementById("destination-name").
    document.getElementById("destination-name").innerText =
    destinationDropdown.options[destinationDropdown.selectedIndex].text;

