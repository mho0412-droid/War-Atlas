// Initialize map centered over Europe/Atlantic
// We use a high zoom level (2) to see the whole world
const map = L.map('map-container', {
    scrollWheelZoom: false,
    zoomSnap: 0.5
}).setView([40.0, 10.0], 2.5);

// 100% FREE, ENGLISH LABELS, NO API KEY REQUIRED (2026 Updated)
L.tileLayer('https://tiles.openfreemap.org/styles/liberty/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenFreeMap contributors &copy; OpenStreetMap',
    maxZoom: 19
}).addTo(map);

// Historical Data (English)
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
            <div style="font-family: 'Oswald', sans-serif; text-align:center; min-width: 150px;">
                <strong style="text-transform: uppercase; letter-spacing: 1px; color: #1a1510;">${loc.title}</strong>
                <p style="font-family: 'Libre Baskerville', serif; font-size: 13px; margin-top: 5px; color: #4a3a28;">${loc.desc}</p>
            </div>
        `);
});
