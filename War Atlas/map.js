// 1. Initialize the map
const map = L.map('map-container', {
    scrollWheelZoom: false,
    zoomSnap: 0.5
}).setView([45.0, 15.0], 3);

// 2. WIKIMEDIA MAPS: English, High-Contrast Borders, and Local-File Friendly
L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a> | &copy; OpenStreetMap',
    maxZoom: 18
}).addTo(map);

// 3. APPLY VINTAGE LOOK (Via Javascript)
// We use a lighter sepia so borders stay sharp and dark.
const mapDiv = document.getElementById('map-container');
if (mapDiv) {
    mapDiv.style.filter = "sepia(0.3) contrast(1.1) brightness(0.9)";
    mapDiv.style.background = "#e3d9c6"; 
}

// 4. Historical Locations (English)
const locations = [
    { title: "London, United Kingdom", coords: [51.5074, -0.1278], desc: "Allied Command" },
    { title: "Normandy, France", coords: [49.4144, -0.8322], desc: "D-Day Landings" },
    { title: "Berlin, Germany", coords: [52.5200, 13.4050], desc: "Axis Power Center" },
    { title: "Moscow, Soviet Union", coords: [55.7558, 37.6173], desc: "Eastern Front Command" }
];

// 5. Ink-Dot Marker
const vintageIcon = L.divIcon({
    className: 'vintage-marker',
    html: '<div style="width: 10px; height: 10px; background: #1a1510; border: 1px solid #fff; border-radius: 50%;"></div>',
    iconSize: [10, 10]
});

// 6. Add Markers
locations.forEach(loc => {
    L.marker(loc.coords, { icon: vintageIcon }).addTo(map)
        .bindPopup(`
            <div style="font-family: sans-serif; text-align:center; min-width: 150px;">
                <strong style="text-transform: uppercase;">${loc.title}</strong>
                <p style="font-size: 13px; margin-top: 5px;">${loc.desc}</p>
            </div>
        `);
});

// 7. AUTO-FIX: This ensures the map renders fully even if it was hidden or loading slowly
setTimeout(() => {
    map.invalidateSize();
}, 500);
