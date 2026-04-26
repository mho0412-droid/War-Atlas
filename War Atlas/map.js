/**
 * THE WAR ATLAS - VIDEO REPLICATION ENGINE
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

// 1. INITIALIZE MAP
const map = L.map('map-container', {
    scrollWheelZoom: true,
    zoomSnap: 0.5,
    minZoom: 2
}).setView([40.0, 20.0], 3.5);

// 2. LAYERS
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png').addTo(map);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}').addTo(map);

territoryLayer.addTo(map);
markerGroup.addTo(map);
document.getElementById('map-container').style.filter = "sepia(0.35) contrast(1.15) brightness(0.95)";

// 3. VIDEO-ALIGNED TERRITORY DATA
const territoryData = {
    "September 1939": [
        // Germany + Albania (Your specific coordinates)
        [[[6.08, 50.77], [8.30, 54.90], [22.92, 54.10], [19.00, 48.00], [10.00, 47.00], [6.08, 50.77]]],
        [[[19.00, 42.50], [20.18, 39.65], [21.00, 41.00], [19.00, 42.50]]]
    ],
    "May 1940": [ // Fall of France Expansion
        [[[ -4.5, 43.0], [7.0, 43.0], [15.0, 46.0], [23.0, 50.0], [23.0, 55.0], [10.0, 58.0], [ -4.5, 50.0], [ -4.5, 43.0]]]
    ],
    "June 1941": [ // Start of Barbarossa
        [[[ -5.0, 40.0], [15.0, 37.0], [30.0, 45.0], [32.0, 55.0], [28.0, 65.0], [10.0, 65.0], [ -5.0, 40.0]]]
    ],
    "June 1942": [ // Maximum Axis Extent (Video Timestamp 07:58)
        [[[ -5.0, 32.0], [30.0, 31.0], [45.0, 43.0], [48.0, 52.0], [42.0, 68.0], [15.0, 70.0], [ -5.0, 65.0], [ -5.0, 32.0]]],
        [[[95,15],[110, -10],[155, -10],[170,20],[150,50],[95,15]]] // Pacific Peak
    ],
    "June 1944": [ // Fortress Europe (Post D-Day)
        [[[8,47],[15,45],[25,48],[24,55],[10,55],[8,47]]],
        [[[120,15],[130,5],[145,20],[145,45],[120,40],[120,15]]]
    ],
    "May 1945": [ // Final Surrender
        [[[10,48],[13,48],[13,52],[10,52],[10,48]]]
    ]
};

// 4. LOCATIONS DATA
const locations = [
    { date: "September 1939", title: "Invasion of Poland", coords: [52.2, 21.0], casualties: "66,000 Polish Troops", outcome: "Start of WWII.", significance: "Blitzkrieg tactics introduced." },
    { date: "June 1941", title: "Operation Barbarossa", coords: [53.9, 27.5], casualties: "Millions (Multiple Fronts)", outcome: "Axis advance toward Moscow.", significance: "Largest military invasion in history." },
    { date: "June 1942", title: "Battle of Midway", coords: [28.2, -177.3], casualties: "3,057 Japanese; 307 Americans", outcome: "US Victory.", significance: "Turning point in the Pacific." },
    { date: "June 1944", title: "D-Day", coords: [49.4, -0.8], casualties: "10,000+ Allies", outcome: "Allied Beachhead.", significance: "Liberation of France begins." }
];

// 5. THE REFRESH LOGIC
function updateMap() {
    const step = timeline[monthIndex];
    const dateKey = `${step.m} ${step.y}`;
    document.getElementById('display-date').innerText = dateKey;

    markerGroup.clearLayers();
    territoryLayer.clearLayers();

    // A. Draw Territory with "Marching Ants" effect
    if (territoryData[dateKey]) {
        L.geoJSON({ type: "MultiPolygon", coordinates: territoryData[dateKey] }, {
            className: 'front-line-path',
            style: { color: "#8b0000", fillColor: "#8b0000", fillOpacity: 0.22, weight: 3 }
        }).addTo(territoryLayer);
    }

    // B. Draw All Markers up to current date
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

// 6. CONTROLS
function changeDate(dir) {
    monthIndex = Math.max(0, Math.min(timeline.length - 1, monthIndex + dir));
    updateMap();
}

function openArchive(idx) {
    const loc = locations[idx];
    document.getElementById('modal-body').innerHTML = `
        <h1 style="font-family:'Oswald'; border-bottom:4px solid #1a1510;">${loc.title} (${loc.date})</h1>
        <div class="dossier-grid">
            <div>
                <div class="stat-box"><b>CASUALTY REPORT:</b><br><span class="casualty-count">${loc.casualties}</span></div>
                <div class="stat-box"><b>SIGNIFICANCE:</b><br>${loc.significance}</div>
            </div>
            <div>
                <h3 style="font-family:'Oswald'; margin-top:0;">CAMPAIGN OUTCOME</h3>
                <p>${loc.outcome}</p>
                <div style="margin-top:40px; font-size:10px; color:#999; border-top:1px solid #ddd;">OFFICIAL WAR RECORD: #TACTICAL-CHRONO-ALPHA</div>
            </div>
        </div>`;
    document.getElementById('history-modal').style.display = 'block';
}

function closeModal() { document.getElementById('history-modal').style.display = 'none'; }

// Init
updateMap();
setTimeout(() => { map.invalidateSize(); }, 500);
