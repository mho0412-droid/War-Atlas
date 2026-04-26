// Initialize map centered over Europe/Atlantic
const map = L.map('map-container', {
    scrollWheelZoom: false
}).setView([45.0, 15.0], 3);

// Option A: OpenStreetMap Humanitarian (No API Key Required)
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
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
