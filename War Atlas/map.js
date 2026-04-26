I understand. The "All Black" issue is almost certainly caused by the CSS filter in your browser. Since you aren't editing the index.html, we will move all the logic into map.js and use a map style that is naturally darker and has high-contrast borders without needing any special filters or overlays.

To get that "1939 Border" feel with English labels, we will use the CartoDB Positron tiles. It is a light-grey, high-contrast map that clearly outlines country borders and defaults to English.

The Updated map.js
Replace your entire map.js with this code. I have added a "Parchment Tint" directly into the Javascript so you don't have to touch your HTML at all.

JavaScript
// 1. Initialize the map
const map = L.map('map-container', {
    scrollWheelZoom: false,
    zoomSnap: 0.5
}).setView([45.0, 15.0], 3);

// 2. Add the "Positron" Layer (High Contrast Borders + English)
// This is the "Light" version of the map you liked earlier, but easier to see.
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// 3. APPLY VINTAGE COLOR (Without touching index.html)
// This code finds the map element and applies a safe, light filter via JS.
const mapEl = document.getElementById('map-container');
if (mapEl) {
    mapEl.style.filter = "sepia(0.4) contrast(1.1) brightness(0.95)";
    mapEl.style.background = "#e3d9c6"; 
}

// 4. Historical Data
const locations = [
    { title: "London, UK", coords: [51.5074, -0.1278], desc: "Allied Command" },
    { title: "Normandy, France", coords: [49.4144, -0.8322], desc: "D-Day Beachhead" },
    { title: "Berlin, Germany", coords: [52.5200, 13.4050], desc: "Axis Power Center" },
    { title: "Moscow, USSR", coords: [55.7558, 37.6173], desc: "Eastern Front Command" }
];

// 5. Custom "Ink Dot" Markers
const vintageIcon = L.divIcon({
    className: 'vintage-marker',
    html: '<div style="width: 10px; height: 10px; background: #1a1510; border: 1px solid #fff; border-radius: 50%;"></div>',
    iconSize: [10, 10]
});

// 6. Add Markers
locations.forEach(loc => {
    L.marker(loc.coords, { icon: vintageIcon }).addTo(map)
        .bindPopup(`
            <div style="font-family: sans-serif; text-align:center;">
                <strong style="text-transform: uppercase;">${loc.title}</strong>
                <p style="font-size: 13px; margin-top: 5px;">${loc.desc}</p>
            </div>
        `);
});
