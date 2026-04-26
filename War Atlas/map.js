/**
 * THE WAR ATLAS - CHRONO-TERRITORY EDITION
 * Includes Dynamic Front Lines, 25+ Locations, and Archive Dossiers.
 */

let currentYear = 1939;
const markerGroup = L.layerGroup(); 
const territoryLayer = L.layerGroup(); // Handles the "Front Lines"

// 1. INITIALIZE MAP
const map = L.map('map-container', {
    scrollWheelZoom: true,
    zoomSnap: 0.5,
    minZoom: 2
}).setView([25.0, 10.0], 2.5);

// 2. LAYERS
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png').addTo(map);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}').addTo(map);

territoryLayer.addTo(map);
markerGroup.addTo(map);

const mapDiv = document.getElementById('map-container');
if (mapDiv) mapDiv.style.filter = "sepia(0.3) contrast(1.2) brightness(0.95)";

// 3. FRONT LINE DATA (Simplified GeoJSON Shapes)
const territoryData = {
    1939: { // Initial invasion
        type: "MultiPolygon",
        coordinates: [[[[6,47],[20,47],[20,55],[6,55],[6,47]]]] 
    },
    1940: { // Fall of France/Low Countries
        type: "MultiPolygon",
        coordinates: [[[[ -2,43],[22,43],[22,58],[ -2,58],[ -2,43]]]]
    },
    1941: { // Operation Barbarossa Peak Expansion
        type: "MultiPolygon",
        coordinates: [[[[ -5,40],[40,40],[40,65],[ -5,65],[ -5,40]]], [[[110, -10],[155, -10],[155,40],[110,40],[110, -10]]]] 
    },
    1942: { // Maximum Axis Extent
        type: "MultiPolygon",
        coordinates: [[[[ -5,35],[45,35],[45,68],[ -5,68],[ -5,35]]], [[[95, -15],[160, -15],[160,50],[95,50],[95, -15]]]]
    },
    1943: { // Soviet Counter-offensive / North Africa Lib
        type: "MultiPolygon",
        coordinates: [[[[5,38],[35,38],[35,65],[5,65],[5,38]]], [[[105, -5],[150, -5],[150,45],[105,45],[105, -5]]]]
    },
    1944: { // Liberation of France / Pacific Push
        type: "MultiPolygon",
        coordinates: [[[[8,47],[15,47],[15,55],[8,55],[8,47]]], [[[120,10],[145,10],[145,40],[120,40],[120,10]]]]
    },
    1945: { // Final Collapse
        type: "MultiPolygon",
        coordinates: [[[[10,48],[13,48],[13,52],[10,52],[10,48]]]]
    }
};

// 4. LOCATIONS DATA (Standard 25)
const locations = [
    { year: 1939, title: "Invasion of Poland", coords: [52.22, 21.01], img: "poland.jpg", teaser: "The spark of WWII.", significance: "Blitzkrieg tactics introduced.", outcome: "Poland divided.", casualties: "200k+" },
    { year: 1940, title: "Dunkirk", coords: [51.03, 2.37], img: "dunkirk.jpg", teaser: "The Great Escape.", significance: "Saved the British Army.", outcome: "Allied evacuation.", casualties: "68,000" },
    { year: 1941, title: "Pearl Harbor", coords: [21.36, -157.94], img: "pearl.jpg", teaser: "US Enters War.", significance: "Globalized the conflict.", outcome: "Tactical JP Victory.", casualties: "2,403" },
    { year: 1942, title: "Stalingrad", coords: [48.70, 44.51], img: "stalingrad.jpg", teaser: "The Turning Point.", significance: "Broke the German Army.", outcome: "Soviet Victory.", casualties: "2 Million" },
    { year: 1944, title: "D-Day", coords: [49.41, -0.83], img: "normandy.jpg", teaser: "Western Front Opens.", significance: "Liberation of France.", outcome: "Allied Victory.", casualties: "10,000+" },
    { year: 1945, title: "Berlin", coords: [52.52, 13.40], img: "berlin.jpg", teaser: "The Final Battle.", significance: "End of Nazi Germany.", outcome: "Total Axis Surrender.", casualties: "Unknown Millions" }
];

// 5. UPDATE FUNCTION
function updateMap() {
    markerGroup.clearLayers();
    territoryLayer.clearLayers();
    document.getElementById('display-year').innerText = currentYear;

    // Draw Front Lines
    if (territoryData[currentYear]) {
        L.geoJSON(territoryData[currentYear], {
            style: {
                color: "#8b0000",
                fillColor: "#8b0000",
                fillOpacity: 0.25,
                weight: 1,
                dashArray: '5, 5'
            }
        }).addTo(territoryLayer);
    }

    // Add Markers
    locations.forEach((loc, index) => {
        if (loc.year <= currentYear) {
            const dotColor = (loc.year === currentYear) ? '#c8941a' : '#000';
            const vintageIcon = L.divIcon({
                className: 'vintage-marker',
                html: `<div style="width:14px; height:14px; background:${dotColor}; border:2px solid #fff; border-radius:50%;"></div>`,
                iconSize: [14, 14]
            });

            const popupContent = `
                <div style="width:200px;">
                    <div style="font-family:'Oswald'; border-bottom:1px solid #c8941a;">[${loc.year}] ${loc.title}</div>
                    <p style="font-size:11px;">${loc.teaser}</p>
                    <button class="archive-btn" onclick="openArchive(${index})">View Dossier</button>
                </div>
            `;

            L.marker(loc.coords, { icon: vintageIcon }).addTo(markerGroup).bindPopup(popupContent);
        }
    });
}

// 6. NAVIGATION & MODAL
function changeYear(step) {
    const next = currentYear + step;
    if (next >= 1939 && next <= 1945) {
        currentYear = next;
        updateMap();
    }
}

function openArchive(index) {
    const loc = locations[index];
    document.getElementById('modal-body').innerHTML = `
        <h1 style="font-family:'Oswald'; border-bottom:4px solid #000;">${loc.title} (${loc.year})</h1>
        <div class="dossier-grid">
            <img src="images/${loc.img}" style="width:100%;" onerror="this.src='https://placehold.co/400x250/000/fff?text=Photo'">
            <div>
                <div class="stat-box"><b>CASUALTIES:</b> ${loc.casualties}</div>
                <p><b>SIGNIFICANCE:</b> ${loc.significance}</p>
                <p><b>OUTCOME:</b> ${loc.outcome}</p>
            </div>
        </div>`;
    document.getElementById('history-modal').style.display = 'block';
}

function closeModal() { document.getElementById('history-modal').style.display = 'none'; }

// Init
updateMap();
setTimeout(() => { map.invalidateSize(); }, 500);
