/**
 * WWII TACTICAL ATLAS - FAILSAFE BUILD
 */

let monthIndex = 0;
const timeline = [
    { m: "September", y: 1939 }, { m: "May", y: 1940 },
    { m: "June", y: 1941 }, { m: "June", y: 1942 },
    { m: "June", y: 1944 }, { m: "May", y: 1945 }
];

// UTILITY: This flips [Lat, Lon] to [Lon, Lat] and closes the loop automatically
function processAxisCoords(rawCoords) {
    const flipped = rawCoords.map(pair => [pair[1], pair[0]]);
    if (flipped[0][0] !== flipped[flipped.length-1][0]) {
        flipped.push(flipped[0]); // Auto-close polygon
    }
    return [[flipped]]; // Wraps in correct MultiPolygon nesting
}

// YOUR ORIGINAL DATA [Lat, Lon]
const raw1939Axis = [
    [55.05, 8.40], [53.86, 7.15], [51.83, 6.00], [50.31, 6.40],
    [49.47, 6.36], [48.97, 8.23], [47.63, 7.52], [47.53, 9.70],
    [47.46, 12.90], [46.55, 13.70], [46.60, 16.20], [48.10, 17.10],
    [49.50, 18.50], [50.00, 22.80], [52.00, 23.60], [53.50, 23.50],
    [54.40, 22.80], [55.30, 21.30], [54.40, 18.60], [54.20, 10.10]
];

const territoryData = {
    "September 1939": {
        axis: processAxisCoords(raw1939Axis),
        allies: [[[[ -5.5, 50.0], [1.5, 50.0], [1.5, 58.5], [-5.5, 58.5], [-5.5, 50.0]]]]
    }
    // (Other years follow same structure)
};

// INITIALIZE MAP
const map = L.map('map-container').setView([50.0, 10.0], 4);
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png').addTo(map);

const territoryLayer = L.layerGroup().addTo(map);
const markerGroup = L.layerGroup().addTo(map);

function updateMap() {
    const step = timeline[monthIndex];
    const dateKey = `${step.m} ${step.y}`;
    const display = document.getElementById('display-date');
    if (display) display.innerText = dateKey;

    territoryLayer.clearLayers();
    
    const data = territoryData[dateKey];
    if (data && data.axis) {
        L.geoJSON({ type: "MultiPolygon", coordinates: data.axis }, {
            style: { color: "#8b0000", weight: 3, fillOpacity: 0.3 }
        }).addTo(territoryLayer);
    }
}

function changeDate(dir) {
    monthIndex = Math.max(0, Math.min(timeline.length - 1, monthIndex + dir));
    updateMap();
}

// Start
window.onload = updateMap;
