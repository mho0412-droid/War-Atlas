/**
 * THE WAR ATLAS - FULL CHRONO-TACTICAL SUITE
 */

let currentYear = 1939;
const markerGroup = L.layerGroup(); 
const territoryLayer = L.layerGroup(); 

// 1. INITIALIZE MAP
const map = L.map('map-container', {
    scrollWheelZoom: true,
    zoomSnap: 0.5,
    minZoom: 2
}).setView([28.0, 15.0], 2.5);

// 2. TILE LAYERS (The "Contrast Sandwich")
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png').addTo(map);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}').addTo(map);

territoryLayer.addTo(map);
markerGroup.addTo(map);

const mapDiv = document.getElementById('map-container');
if (mapDiv) mapDiv.style.filter = "sepia(0.35) contrast(1.2) brightness(0.95)";

// 3. REALISTIC TERRITORY DATA (Simplified MultiPolygons)
const territoryData = {
    1939: { 
        type: "MultiPolygon",
        coordinates: [[[[6.0, 47.5], [15.0, 47.5], [21.0, 50.0], [23.0, 55.0], [15.0, 55.5], [6.0, 54.0], [6.0, 47.5]]]]
    },
    1940: { 
        type: "MultiPolygon",
        coordinates: [[[[ -4.5, 48.0], [ -1.5, 43.0], [7.0, 43.0], [15.0, 46.0], [22.0, 48.0], [23.0, 55.0], [10.0, 58.0], [5.0, 58.0], [ -4.5, 48.0]]]]
    },
    1941: { 
        type: "MultiPolygon",
        coordinates: [
            [[[ -5.0, 45.0], [10.0, 37.0], [25.0, 40.0], [35.0, 45.0], [37.0, 55.0], [32.0, 60.0], [15.0, 65.0], [ -5.0, 60.0], [ -5.0, 45.0]]],
            [[[105.0, 5.0], [125.0, -10.0], [150.0, 0.0], [155.0, 25.0], [145.0, 45.0], [115.0, 40.0], [105.0, 5.0]]]
        ]
    },
    1942: { // Maximum Axis Extent
        type: "MultiPolygon",
        coordinates: [
            [[[ -5.0, 32.0], [25.0, 31.0], [45.0, 43.0], [48.0, 50.0], [42.0, 65.0], [15.0, 70.0], [ -5.0, 65.0], [ -5.0, 32.0]]],
            [[[90.0, 15.0], [100.0, -10.0], [150.0, -10.0], [165.0, 10.0], [175.0, 30.0], [150.0, 50.0], [115.0, 45.0], [90.0, 15.0]]]
        ]
    },
    1943: { 
        type: "MultiPolygon",
        coordinates: [
            [[[7.0, 40.0], [20.0, 38.0], [35.0, 45.0], [36.0, 55.0], [30.0, 65.0], [10.0, 65.0], [7.0, 40.0]]],
            [[[100.0, 0.0], [110.0, -5.0], [150.0, 5.0], [155.0, 40.0], [115.0, 45.0], [100.0, 0.0]]]
        ]
    },
    1944: { 
        type: "MultiPolygon",
        coordinates: [
            [[[6.0, 47.0], [15.0, 45.0], [25.0, 48.0], [24.0, 55.0], [10.0, 55.0], [6.0, 47.0]]],
            [[[120.0, 15.0], [130.0, 5.0], [145.0, 20.0], [145.0, 45.0], [120.0, 40.0], [120.0, 15.0]]]
        ]
    },
    1945: { 
        type: "MultiPolygon",
        coordinates: [[[[10.0, 48.0], [15.0, 48.0], [15.0, 53.0], [10.0, 53.0], [10.0, 48.0]]]]
    }
};

// 4. LOCATIONS DATA (Expanded for Dossier)
const locations = [
    { year: 1939, title: "Invasion of Poland", coords: [52.22, 21.01], img: "poland.jpg", teaser: "The outbreak of WWII.", significance: "Demonstrated Blitzkrieg tactics to the world.", outcome: "Poland surrendered within 35 days.", casualties: "66,000 Polish soldiers killed." },
    { year: 1941, title: "Pearl Harbor", coords: [21.36, -157.94], img: "pearl.jpg", teaser: "America joins the global conflict.", significance: "Unified US public opinion and production for total war.", outcome: "Decisive Japanese tactical victory; strategic American entry.", casualties: "2,403 Americans killed." },
    { year: 1942, title: "Stalingrad", coords: [48.70, 44.51], img: "stalingrad.jpg", teaser: "The Turning Point of the War.", significance: "The first major defeat of the Nazi war machine.", outcome: "German 6th Army destroyed.", casualties: "Estimated 2 Million (Both sides)." },
    { year: 1944, title: "D-Day (Normandy)", coords: [49.41, -0.83], img: "normandy.jpg", teaser: "Liberation of Western Europe begins.", significance: "Opened a massive second front in the West.", outcome: "Established Allied beachhead in France.", casualties: "10,000+ Allied casualties on day one." }
];

// 5. UPDATE MAP FUNCTION
function updateMap() {
    markerGroup.clearLayers();
    territoryLayer.clearLayers();
    document.getElementById('display-year').innerText = currentYear;

    // A. Draw Front Lines for Current Year
    if (territoryData[currentYear]) {
        L.geoJSON(territoryData[currentYear], {
            style: {
                color: "#8b0000",
                fillColor: "#8b0000",
                fillOpacity: 0.18,
                weight: 2,
                dashArray: '8, 8',
                lineJoin: 'round'
            }
        }).addTo(territoryLayer);
    }

    // B. Add Markers that occurred by this year
    locations.forEach((loc, index) => {
        if (loc.year <= currentYear) {
            const dotColor = (loc.year === currentYear) ? '#c8941a' : '#1a1510';
            const vintageIcon = L.divIcon({
                className: 'vintage-marker',
                html: `<div style="width:14px; height:14px; background:${dotColor}; border:2px solid #fff; border-radius:50%; box-shadow:0 0 5px rgba(0,0,0,0.5);"></div>`,
                iconSize: [14, 14]
            });

            const popupContent = `
                <div style="width:190px;">
                    <div style="font-family:'Oswald'; border-bottom:1px solid #c8941a; font-size:14px;">[${loc.year}] ${loc.title}</div>
                    <p style="font-size:11px; margin:5px 0;">${loc.teaser}</p>
                    <button class="archive-btn" onclick="openArchive(${index})">Read Archive</button>
                </div>
            `;

            L.marker(loc.coords, { icon: vintageIcon }).addTo(markerGroup).bindPopup(popupContent);
        }
    });
}

// 6. TIME NAVIGATION
function changeYear(step) {
    const next = currentYear + step;
    if (next >= 1939 && next <= 1945) {
        currentYear = next;
        updateMap();
    }
}

// 7. ARCHIVE MODAL LOGIC
function openArchive(index) {
    const loc = locations[index];
    document.getElementById('modal-body').innerHTML = `
        <h1 style="font-family:'Oswald'; border-bottom:4px solid #1a1510; letter-spacing:1px;">DOSSIER: ${loc.title}</h1>
        <div class="dossier-grid">
            <div>
                <img src="images/${loc.img}" style="width:100%; border:2px solid #000;" onerror="this.src='https://placehold.co/450x300/1a1510/d4c8a8?text=Historical+Photo'">
                <div class="stat-box">
                    <div style="font-family:'Oswald'; font-size:12px; color:var(--gold);">BATTLEFIELD CASUALTIES</div>
                    <div class="casualty-count">${loc.casualties}</div>
                </div>
            </div>
            <div>
                <h3 style="font-family:'Oswald'; margin-top:0;">HISTORICAL SIGNIFICANCE</h3>
                <p style="font-style:italic; font-size:14px;">"${loc.significance}"</p>
                <h3 style="font-family:'Oswald'; margin-top:20px;">CAMPAIGN OUTCOME</h3>
                <p style="font-size:14px;">${loc.outcome}</p>
                <div style="margin-top:30px; border-top:1px solid #ccc; padding-top:10px; font-size:11px; color:#777;">
                    WAR OFFICE RECORD #772-${loc.year} // CONFIDENTIAL
                </div>
            </div>
        </div>`;
    document.getElementById('history-modal').style.display = 'block';
}

function closeModal() { document.getElementById('history-modal').style.display = 'none'; }

// Init
updateMap();
setTimeout(() => { map.invalidateSize(); }, 500);
