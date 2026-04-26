/** * THE WAR ATLAS - VIDEO REPLICATION ENGINE 
 */

let monthIndex = 0; 
const timeline = [
    { m: "September", y: 1939 }, { m: "December", y: 1939 },
    { m: "May", y: 1940 },       { m: "August", y: 1940 },
    { m: "June", y: 1941 },      { m: "December", y: 1941 },
    { m: "June", y: 1942 },      { m: "November", y: 1942 },
    { m: "July", y: 1943 },      { m: "June", y: 1944 },
    { m: "January", y: 1945 },   { m: "May", y: 1945 }
];

const markerGroup = L.layerGroup();
const territoryLayer = L.layerGroup();

// 1. MAP INIT
const map = L.map('map-container').setView([45.0, 15.0], 3.5);
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png').addTo(map);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}').addTo(map);

territoryLayer.addTo(map);
markerGroup.addTo(map);
document.getElementById('map-container').style.filter = "sepia(0.3) contrast(1.1)";

// 2. VIDEO-ACCURATE COORDINATES (Keyframes)
const territoryData = {
    "September 1939": [[[[6,50],[15,50],[21,52],[22,55],[15,55],[6,54],[6,50]]]],
    "May 1940": [[[[ -3,45],[7,45],[15,46],[22,48],[23,55],[10,59],[ -3,59],[ -3,45]]]],
    "June 1941": [[[[ -5,40],[15,37],[30,45],[32,55],[28,65],[ -5,65],[ -5,40]]]],
    "June 1942": [
        [[[ -5,32],[30,31],[45,43],[48,52],[42,68],[15,70],[ -5,65],[ -5,32]]], // Eastern Front Peak
        [[[95,15],[110, -10],[155, -10],[170,20],[150,50],[95,15]]] // Pacific Peak
    ],
    "June 1944": [
        [[[8,47],[22,45],[28,55],[10,55],[8,47]]], // Italy and Fortress Europe
        [[[120,15],[135,10],[145,25],[145,45],[120,40],[120,15]]] // Shrinking Pacific
    ],
    "May 1945": [[[[10,48],[13,48],[13,52],[10,52],[10,48]]]] // Berlin Final Pocket
};

// 3. LOCATIONS (Standard Archive)
const locations = [
    { date: "September 1939", title: "Invasion of Poland", coords: [52.2, 21.0], casualties: "66,000 Polish killed", outcome: "Total occupation." },
    { date: "June 1941", title: "Operation Barbarossa", coords: [53.9, 27.5], casualties: "Millions", outcome: "Deep Axis advance into USSR." },
    { date: "June 1944", title: "D-Day", coords: [49.4, -0.8], casualties: "10,000 Allies", outcome: "Western Front Opened." }
];

// 4. THE ENGINE
function updateMap() {
    const step = timeline[monthIndex];
    const dateKey = `${step.m} ${step.y}`;
    document.getElementById('display-date').innerText = dateKey;

    markerGroup.clearLayers();
    territoryLayer.clearLayers();

    // DRAW FRONT LINES
    if (territoryData[dateKey]) {
        L.geoJSON({ type: "MultiPolygon", coordinates: territoryData[dateKey] }, {
            className: 'front-line-path',
            style: { color: "#8b0000", fillColor: "#8b0000", fillOpacity: 0.2, weight: 3 }
        }).addTo(territoryLayer);
    }

    // DRAW MARKERS
    locations.forEach((loc, idx) => {
        // Simple logic: if the location's year is <= current year, show it
        const locYear = parseInt(loc.date.split(" ")[1]);
        if (locYear <= step.y) {
            const isNew = (loc.date === dateKey);
            const icon = L.divIcon({
                className: 'v-marker',
                html: `<div style="width:14px; height:14px; background:${isNew ? '#c8941a' : '#000'}; border:2px solid #fff; border-radius:50%;"></div>`
            });
            L.marker(loc.coords, { icon: icon }).addTo(markerGroup).bindPopup(`
                <div style="font-family:'Oswald'; border-bottom:1px solid #c8941a;">${loc.title}</div>
                <button class="archive-btn" onclick="openArchive(${idx})">Archive Dossier</button>
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
        <h1 style="font-family:'Oswald'; border-bottom:4px solid #000;">${loc.title}</h1>
        <div class="dossier-grid">
            <div class="stat-box"><b>CASUALTIES:</b><br><span style="color:#8b0000; font-size:20px;">${loc.casualties}</span></div>
            <div><p><b>FINAL OUTCOME:</b><br>${loc.outcome}</p></div>
        </div>`;
    document.getElementById('history-modal').style.display = 'block';
}

function closeModal() { document.getElementById('history-modal').style.display = 'none'; }

updateMap();
