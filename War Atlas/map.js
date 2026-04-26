// 1. Initialize the map
const map = L.map('map-container', {
    scrollWheelZoom: false,
    zoomSnap: 0.5
}).setView([45.0, 15.0], 3);

// 2. THE BACKGROUND (Ocean and Land Color)
// We use the "Humanitarian" layer because it colors land and water differently
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
}).addTo(map);

// 3. THE BORDERS & LABELS (High Contrast Ink)
// We lay this on top like a transparent piece of film with black borders.
// This layer is 100% English and specifically for outlines.
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Labels &copy; Esri',
    maxZoom: 18
}).addTo(map);

// 4. THE VINTAGE CONTRAST (Via Javascript)
const mapDiv = document.getElementById('map-container');
if (mapDiv) {
    // This filter darkens the borders (Reference layer) 
    // while shifting the land colors into a vintage palette.
    mapDiv.style.filter = "sepia(0.5) contrast(1.5) brightness(0.9) saturate(1.2)";
    mapDiv.style.background = "#dcd1ba"; 
}

// 5. Locations (English)
const locations = [
    { title: "London, UK", coords: [51.5074, -0.1278], desc: "Allied HQ" },
    { title: "Normandy, France", coords: [49.4144, -0.8322], desc: "D-Day Landings" },
    { title: "Berlin, Germany", coords: [52.5200, 13.4050], desc: "Axis Center" }
];

const vintageIcon = L.divIcon({
    className: 'vintage-marker',
    html: '<div style="width: 12px; height: 12px; background: #000; border: 2px solid #fff; border-radius: 50%;"></div>',
    iconSize: [12, 12]
});

locations.forEach(loc => {
    L.marker(loc.coords, { icon: vintageIcon }).addTo(map)
        .bindPopup(`<b>${loc.title}</b><br>${loc.desc}`);
});

// Force fix for local file rendering
setTimeout(() => { map.invalidateSize(); }, 400);
