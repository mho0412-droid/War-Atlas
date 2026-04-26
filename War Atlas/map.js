// Initialize map centered over Europe/Atlantic
const map = L.map('map-container', {
    scrollWheelZoom: false
}).setView([45.0, 15.0], 3);

// OPTION: Esri World Terrain (Clean, English-focused, No API Key)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ',
    maxZoom: 18
}).addTo(map);

// Locations data
const locations = [
    {
        title: "London, United Kingdom",
        coords: [51.5074, -0.1278],
        desc: "Command center for the Western Allies."
    },
    {
        title: "Normandy, France",
        coords: [49.4144, -0.8322],
        desc: "Site of the D-Day landings."
    },
    {
        title: "Berlin, Germany",
        coords: [52.5200, 13.4050],
        desc: "Capital of the Third Reich."
    },
    {
        title: "Moscow, Russia",
        coords: [55.7558, 37.6173],
        desc: "Soviet Strategic Command."
    }
];

// Simple black dot markers for a 'printed' look
const vintageIcon = L.divIcon({
    className: 'vintage-marker',
    html: '<div style="width: 10px; height: 10px; background: #1a1510; border: 1px solid #fff; border-radius: 50%;"></div>',
    iconSize: [10, 10]
});

// Add locations to map
locations.forEach(loc => {
    L.marker(loc.coords, { icon: vintageIcon })
        .addTo(map)
        .bindPopup(`
            <div style="font-family: 'Oswald', sans-serif; text-align:center;">
                <strong style="text-transform: uppercase; letter-spacing: 1px;">${loc.title}</strong>
                <p style="font-family: 'Libre Baskerville', serif; font-size: 13px; margin-top: 5px;">${loc.desc}</p>
            </div>
        `);
});
2. Adjusting the "Vintage" look in index.html
Because the Esri map is a bit more detailed (blue oceans, green forests), we need to adjust our CSS filter in index.html to make sure it still looks like 1939 parchment.

Update the .leaflet-container style in your index.html:

CSS
/* Optimized for Esri World Street Map */
.leaflet-container {
  filter: sepia(0.8) contrast(1.2) brightness(0.9) saturate(0.6);
  background: #e3d9c6 !important;
}
