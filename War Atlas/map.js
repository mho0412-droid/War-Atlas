// 1. Setup the Map (Center on Europe/Atlantic)
const map = L.map('map-container', {
    scrollWheelZoom: false // Prevents accidental zooming while scrolling the page
}).setView([30.0, 10.0], 2);

// 2. Add Dark Theme Tiles (CartoDB Dark Matter)
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// 3. Historical Data Array
const locations = [
    {
        title: "Normandy, France",
        date: "June 6, 1944",
        coords: [49.4144, -0.8322],
        description: "D-Day Landings"
    },
    {
        title: "Pearl Harbor, Hawaii",
        date: "Dec 7, 1941",
        coords: [21.3648, -157.9492],
        description: "Attack on the Pacific Fleet"
    },
    {
        title: "Stalingrad, USSR",
        date: "1942-1943",
        coords: [48.7080, 44.5133],
        description: "The Battle of Stalingrad"
    }
];

// 4. Add Markers to Map
locations.forEach(loc => {
    const marker = L.marker(loc.coords).addTo(map);
    
    // Customizing the popup style
    marker.bindPopup(`
        <div style="font-family: 'Oswald', sans-serif; color: #1a1510;">
            <strong style="text-transform: uppercase;">${loc.title}</strong><br>
            <span style="color: #c8941a; font-size: 0.8em;">${loc.date}</span><br>
            <p style="font-family: 'Libre Baskerville', serif; font-size: 0.9em; margin-top: 5px;">${loc.description}</p>
        </div>
    `);
});
