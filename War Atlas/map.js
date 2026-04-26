/**
 * THE WAR ATLAS - COLOR-CODED FACTION ENGINE
 */

let monthIndex = 0; 
const timeline = [
    { m: "September", y: 1939 }, { m: "May", y: 1940 },
    { m: "June", y: 1941 },      { m: "December", y: 1941 },
    { m: "June", y: 1942 },      { m: "November", y: 1942 },
    { m: "June", y: 1944 },      { m: "May", y: 1945 }
];

const markerGroup = L.layerGroup(); 
const territoryLayer = L.layerGroup(); 

const map = L.map('map-container').setView([45.0, 10.0], 3.5);
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png').addTo(map);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}').addTo(map);

territoryLayer.addTo(map);
markerGroup.addTo(map);
document.getElementById('map-container').style.filter = "sepia(0.3) contrast(1.2)";

// TACTICAL DATA: Axis (Red) and Allies (Blue)
const territoryData = {
    "September 1939": {
        axis: [
            [[[6.08, 50.77], [8.30, 54.90], [22.92, 54.10], [19.00, 48.00], [10.00, 47.00], [6.08, 50.77]]], // Germany
            [[[19.00, 42.50], [20.18, 39.65], [21.00, 41.00], [19.00, 42.50]]] // Albania
        ],
        allies: [
            [[[-5, 50], [2, 50], [2, 58], [-5, 58], [-5, 50]]], // UK
            [[[-5, 42], [7, 42], [7, 50], [-5, 50], [-5, 42]]]  // France
        ]
    },
    "June 1941": {
        axis: [[[[ -5, 40], [15, 37], [30, 45], [32, 55], [28, 65], [10, 65], [ -5, 40]]]],
        allies: [
            [[[-5, 50], [2, 50], [2, 58], [-5, 58], [-5, 50]]], // UK
            [[[35, 40], [60, 40], [60, 70], [35, 70], [35, 40]]]  // USSR Initial
        ]
    },
    "June 1942": {
        axis: [
            [[[ -5, 32], [30, 31], [45, 43], [48, 52], [42, 68], [15, 70], [ -5, 65], [ -5, 32]]],
            [[[95,15],[110, -10],[155, -10],[170,20],[150,50],[95,15]]] // Pacific Max
        ],
        allies: [
            [[[-5, 50], [2, 50], [2, 58], [-5, 58], [-5, 50]]], // UK
            [[[48, 40], [70, 40], [70, 75], [48, 75], [48, 40]]]  // USSR Deep Defense
        ]
    },
    "June 1944": {
        axis: [[[[8, 47], [22, 45], [28, 55], [10, 55], [8, 47]]]],
        allies: [
            [[[-5, 42], [10, 42], [10, 55], [-5, 55], [-5, 42]]], // Liberated West
            [[[25, 40], [60, 40], [60, 70], [25, 70], [25, 40]]]  // Soviet Advance
        ]
    },
    "May 1945": {
        axis: [[[[13.0, 52.5], [13.5, 52.5], [13.5, 52.8], [13.0, 52.8], [13.0, 52.5]]]], // Berlin Pocket
        allies: [[[[ -10, 35], [40, 35], [40, 75], [ -10, 75], [ -10, 35]]]] // Europe Liberated
    }
};

const locations = [
    { date: "September 1939", title: "Invasion of Poland", coords: [52.2, 21.0], casualties: "66,000 Polish Troops", outcome: "Axis occupation." },
    { date: "June 1941", title: "Operation Barbarossa", coords: [53.9, 27.5], casualties: "Millions", outcome: "Deep Axis advance into USSR." },
    { date: "June 1944", title: "D-Day", coords: [49.4, -0.8], casualties: "10,000 Allies", outcome: "Western Front Opened." }
];

function updateMap() {
    const step = timeline[monthIndex];
    const dateKey = `${step.m} ${step.y}`;
    document.getElementById('display-date').innerText = dateKey;

    markerGroup.clearLayers();
    territoryLayer.clearLayers();

    const data = territoryData[dateKey];
    if (data) {
        // Draw Axis (Red)
        if (data.axis) {
            L.geoJSON({ type: "MultiPolygon", coordinates: data.axis }, {
                className: 'front-line-path',
                style: { color: "#8b0000", fillColor: "#8b0000", fillOpacity: 0.22, weight: 3 }
            }).addTo(territoryLayer);
        }
        // Draw Allies (Blue)
        if (data.allies) {
            L.geoJSON({ type: "MultiPolygon", coordinates: data.allies }, {
                className: 'front-line-path',
                style: { color: "#00468c", fillColor: "#00468c", fillOpacity: 0.22, weight: 3 }
            }).addTo(territoryLayer);
        }
    }

    locations.forEach((loc, idx) => {
        const locYear = parseInt(loc.date.split(" ")[1]);
        if (locYear <= step.y) {
            const isNew = (loc.date === dateKey);
            const icon = L.divIcon({
                className: 'v-marker',
                html: `<div style="width:14px; height:14px; background:${isNew ? '#c8941a' : '#1a1510'}; border:2px solid #fff; border-radius:50%; box-shadow:0 0 5px rgba(0,0,0,0.5);"></div>`,
                iconSize: [14, 14]
            });
            L.marker(loc.coords, { icon: icon }).addTo(markerGroup).bindPopup(`
                <div style="font-family:'Oswald'; border-bottom:1px solid #c8941a;">${loc.title}</div>
                <button class="archive-btn" onclick="openArchive(${idx})">Read Archive</button>
            `);
        }
    });
}

function changeDate(dir) {
    monthIndex = Math.max(0, Math.min(timeline.length - 1, monthIndex + dir));
    updateMap();
}

function openArchive(idx) {
    const loc = locations[idx];
    document.getElementById('modal-body').innerHTML = `
        <h1 style="font-family:'Oswald'; border-bottom:4px solid #1a1510;">DOSSIER: ${loc.title}</h1>
        <div class="dossier-grid">
            <div class="stat-box"><b>CASUALTIES:</b><br><span style="color:#8b0000; font-size:20px;">${loc.casualties}</span></div>
            <div><p><b>OUTCOME:</b><br>${loc.outcome}</p></div>
        </div>`;
    document.getElementById('history-modal').style.display = 'block';
}

function closeModal() { document.getElementById('history-modal').style.display = 'none'; }

updateMap();
