// 1. Initialize the map
const map = L.map('map-container', {
    scrollWheelZoom: false,
    zoomControl: true
}).setView([40.0, 10.0], 3); // Centered to show the Atlantic and Europe

// 2. Add the "Stamen Terrain" layer (Classic "Atlas" look)
// This provider uses English labels globally.
L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; Stadia Maps, &copy; Stamen Design, &copy; OpenStreetMap',
    maxZoom: 18
}).addTo(map);

// 3. Historical Data with English Labels
const locations = [
    {
        title: "UNITED KINGDOM",
        city: "London",
        coords: [51.5074, -0.1278],
        description: "The Blitz and Command HQ."
    },
    {
        title: "FRANCE",
        city: "Normandy",
        coords: [49.4144, -0.8322],
        description: "Operation Overlord Beachhead."
    },
    {
        title: "GERMANY",
        city: "Berlin",
        coords: [52.5200, 13.4050],
        description: "Central European Theater."
    },
    {
        title: "USA",
        city: "Pearl Harbor",
        coords: [21.3648, -157.9492],
        description: "Entry point for the Pacific War."
    }
];

// 4. Custom Icon (Optional: Use a small black circle for a 'printed' look)
const vintageIcon = L.divIcon({
    className: 'vintage-marker',
    html: '<div style="width: 12px; height: 12px; background: black; border: 2px solid white; border-radius: 50%;"></div>',
    iconSize: [12, 12]
});

// 5. Add Markers
locations.forEach(loc => {
    L.marker(loc.coords, { icon: vintageIcon }).addTo(map)
        .bindPopup(`
            <div style="font-family: 'Oswald', sans-serif; text-align: center;">
                <span style="font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Location</span><br>
                <strong style="font-size: 16px; border-bottom: 1px solid #000;">${loc.city}, ${loc.title}</strong>
                <p style="font-family: 'Libre Baskerville', serif; font-style: italic; font-size: 13px; margin-top: 8px;">${loc.description}</p>
            </div>
        `);
});
