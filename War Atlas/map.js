// 1. Initialize map
const map = L.map('map-container', {
    scrollWheelZoom: false
}).setView([45.0, 15.0], 3);

// 2. Use CartoDB Voyager (Bright, English Labels, No Key)
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// 3. Your Locations
const locations = [
    { title: "London", coords: [51.5074, -0.1278], desc: "United Kingdom HQ" },
    { title: "Normandy", coords: [49.4144, -0.8322], desc: "D-Day Landings" },
    { title: "Berlin", coords: [52.5200, 13.4050], desc: "Germany" }
];

const vintageIcon = L.divIcon({
    className: 'vintage-marker',
    html: '<div style="width: 12px; height: 12px; background: #1a1510; border: 2px solid #fff; border-radius: 50%;"></div>',
    iconSize: [12, 12]
});

locations.forEach(loc => {
    L.marker(loc.coords, { icon: vintageIcon }).addTo(map)
        .bindPopup(`<b>${loc.title}</b><br>${loc.desc}`);
});
