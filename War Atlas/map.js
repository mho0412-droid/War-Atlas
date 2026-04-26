// 1. Initialize the map
const map = L.map('map-container', {
    scrollWheelZoom: false,
    zoomSnap: 0.5
}).setView([45.0, 15.0], 3);

// 2. ESRI WORLD GRAY: Famous for high-contrast country borders and English labels
// This layer is extremely stable for local file testing.
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, Garmin, HERE',
    maxZoom: 16
}).addTo(map);

// 3. Add the Reference Layer (This adds the BORDERS and LABELS on top)
// Without this second layer, the map is just landmasses. 
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 16
}).addTo(map);

// 4. THE VINTAGE ADJUSTMENT
// We boost the contrast so the country lines are sharp and dark
const mapDiv = document.getElementById('map-container');
if (mapDiv) {
    mapDiv.style.filter = "sepia(0.5) contrast(1.4) brightness(0.9)";
    mapDiv.style.background = "#dcd1ba"; 
}

// 5. Locations (English)
const locations = [
    { title: "London, UK", coords: [51.5074, -0.1278], desc: "Allied Command" },
    { title: "Normandy, France", coords: [49.4144, -0.8322], desc: "D-Day Landings" },
    { title: "Berlin, Germany", coords: [52.5200, 13.4050], desc: "Axis Center" },
    { title: "Moscow, Soviet Union", coords: [55.7558, 37.6173], desc: "Eastern Front" }
];

const vintageIcon = L.divIcon({
    className: 'vintage-marker',
    html: '<div style="width: 10px; height: 10px; background: #1a1510; border: 1px solid #fff; border-radius: 50%;"></div>',
    iconSize: [10, 10]
});

locations.forEach(loc => {
    L.marker(loc.coords, { icon: vintageIcon }).addTo(map)
        .bindPopup(`<b>${loc.title}</b><br>${loc.desc}`);
});

// Force refresh to handle local file loading glitches
setTimeout(() => { map.invalidateSize(); }, 400);
