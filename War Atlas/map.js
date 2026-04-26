/**
 * THE WAR ATLAS - HIGH PRECISION DATA ENGINE
 */

let monthIndex = 0;
const timeline = [
    { m: "September", y: 1939 }, 
    { m: "May", y: 1940 },
    { m: "June", y: 1941 }, 
    { m: "June", y: 1942 },
    { m: "June", y: 1944 },
    { m: "May", y: 1945 }
];

const markerGroup = L.layerGroup();
const territoryLayer = L.layerGroup();

// Initialize Map
const map = L.map('map-container').setView([50.0, 15.0], 4);
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png').addTo(map);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}').addTo(map);

territoryLayer.addTo(map);
markerGroup.addTo(map);
document.getElementById('map-container').style.filter = "sepia(0.3) contrast(1.1) brightness(0.9)";

// TERRITORY DATA
const territoryData = {
    "September 1939": {
        axis: [
            // YOUR HIGH-PRECISION COORDINATES (Flipped to Lon/Lat)
            [[
                [8.40, 55.05], [7.15, 53.86], [6.00, 51.83], [6.40, 50.31], 
                [6.36, 49.47], [8.23, 48.97], [7.52, 47.63], [9.70, 47.53], 
                [12.90, 47.46], [13.70, 46.55], [16.20, 46.60], [17.10, 48.10], 
                [18.50, 49.50], [22.80, 50.00], [23.60, 52.00], [23.50, 53.50], 
                [22.80, 54.40], [21.30, 55.30], [18.60, 54.40], [10.10, 54.20],
                [8.40, 55.05] // Closed loop
            ]],
            // Italian Albania Sector
            [[[19.00, 42.50], [20.18, 39.65], [21.00, 41.00], [19.00, 42.50]]]
        ],
        allies: [
            // United Kingdom (Generalized Coastal)
            [[[-5.5, 50.0], [1.5, 50.0], [1.5, 58.5], [-5.5, 58.5], [-5.5, 50.0]]],
            // France
            [[[-4.8, 48.5], [6.2, 49.2], [7.5, 47.5], [7.0, 43.5], [-1.5, 43.2], [-4.8, 48.5]]]
        ]
    },
    // Placeholders for other years using previous simplified data
    "May 1940": { axis: [[[[ -4,43],[7,43],[15,46],[23,55],[10,58],[ -4,55],[ -4,43]]]], allies: [[[-5,50],[2,50],[2,58],[-5,58],[-5,50]]]] },
    "June 1941": { axis: [[[[15,37],[35,45],[38,55],[15,65],[-5,65],[-5,40],[15,37]]]], allies: [[[-5,50],[2,50],[2,58],[-5,58],[-5,50]]] },
    "June 1942": { axis: [[[[ -5,31],[45,43],[48,52],[15,70],[ -5,65]]], [[[95,15],[160,10],[150,50],[95,15]]]], allies: [[[50,40],[70,40],[70,75],[50,75]]] },
    "June 1944": { axis: [[[[10,48],[22,46],[22,55],[10,55]]]], allies: [[[[ -5,42],[15,42],[15,55],[-5,55]]]] },
    "May 1945": { axis: [[[[13,52],[13.5,52],[13.5,53],[13,53]]]], allies: [[[[ -10,35],[40,35],[40,75],[-10,75]]]] }
};

const locations = [
    { date: "September 1939", title: "Invasion of Poland", coords: [52.2, 21.0], casualties: "66,000 Polish Troops", outcome: "WWII Commences." },
    { date: "June 1944", title: "D-Day Landings", coords: [49.4, -0.8], casualties: "10,000 Allied", outcome: "Beachhead established." }
];

function updateMap() {
    const step = timeline[monthIndex];
    const dateKey = `${step.m} ${step.y}`;
    document.getElementById('display-date').innerText = dateKey;

    territoryLayer.clearLayers();
    markerGroup.clearLayers();

    const data = territoryData[dateKey];
    if (data) {
        if (data.axis) {
            L.geoJSON({ type: "MultiPolygon", coordinates: data.axis }, {
                className: 'front-line-path',
                style: { color: "#8b0000", fillColor: "#8b0000", fillOpacity: 0.2, weight: 3 }
            }).addTo(territoryLayer);
        }
        if (data.allies) {
            L.geoJSON({ type: "MultiPolygon", coordinates: data.allies }, {
                className: 'front-line-path',
                style: { color: "#00468c", fillColor: "#00468c", fillOpacity: 0.2, weight: 3 }
            }).addTo(territoryLayer);
        }
    }

    locations.forEach((loc, idx) => {
        const locYear = parseInt(loc.date.split(" ")[1]);
        if (locYear <= step.y) {
            const isNew = (loc.date === dateKey);
            const icon = L.divIcon({
                className: 'v-marker',
                html: `<div style="width:12px; height:12px; background:${isNew ? '#c8941a' : '#1a1510'}; border:2px solid #fff; border-radius:50%;"></div>`
            });
            L.marker(loc.coords, { icon: icon }).addTo(markerGroup).bindPopup(`
                <b>${loc.title}</b><br><button class="archive-btn" onclick="openArchive(${idx})">Archives</button>
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
        <h2 style="font-family:'Oswald'">${loc.title}</h2>
        <p><b>CASUALTIES:</b> ${loc.casualties}</p>
        <p><b>OUTCOME:</b> ${loc.outcome}</p>`;
    document.getElementById('history-modal').style.display = 'block';
}

function closeModal() { document.getElementById('history-modal').style.display = 'none'; }

updateMap();
