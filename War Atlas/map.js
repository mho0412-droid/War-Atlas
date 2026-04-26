/**
 * THE WAR ATLAS - TACTICAL CHRONOLOGY
 */

let currentYear = 1939;
const markerGroup = L.layerGroup(); 
const territoryLayer = L.layerGroup(); 

// 1. INITIALIZE MAP
const map = L.map('map-container', {
    scrollWheelZoom: true,
    zoomSnap: 0.5,
    minZoom: 2
}).setView([45.0, 15.0], 4); // Focused more on Europe for the 1939 start

// 2. TILE LAYERS
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png').addTo(map);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}').addTo(map);

territoryLayer.addTo(map);
markerGroup.addTo(map);

const mapDiv = document.getElementById('map-container');
if (mapDiv) mapDiv.style.filter = "sepia(0.35) contrast(1.2) brightness(0.95)";

// 3. UPDATED TERRITORY DATA (Using your provided 1939 points)
const territoryData = {
    1939: { 
        type: "MultiPolygon",
        coordinates: [
            // GREATER GERMANY: Westerland (N), Suwalki (E), Aachen (W)
            [[
                [6.08, 50.77],   // Aachen (West)
                [8.30, 54.90],   // Westerland (North)
                [22.92, 54.10],  // Suwalki (East)
                [19.00, 48.00],  // Central Europe Anchor
                [10.00, 47.00],  // Southern Anchor
                [6.08, 50.77]    // Back to Start
            ]],
            // ITALIAN ALBANIA: Konispol (S)
            [[
                [19.00, 42.50],  // Northern Albania
                [20.18, 39.65],  // Konispol (South)
                [21.00, 41.00],  // Eastern Border
                [19.00, 42.50]   // Back to Start
            ]]
        ]
    },
    1940: { // Expanded to include France/Low Countries
        type: "MultiPolygon",
        coordinates: [[[[ -4.5, 48.0], [ -1.5, 43.0], [7.0, 43.0], [15.0, 46.0], [23.0, 55.0], [10.0, 58.0], [5.0, 58.0], [ -4.5, 48.0]]]]
    },
    1941: { // Eastern Front Expansion
        type: "MultiPolygon",
        coordinates: [
            [[[ -5.0, 45.0], [10.0, 37.0], [25.0, 40.0], [45.0, 50.0], [35.0, 65.0], [15.0, 65.0], [ -5.0, 45.0]]],
            [[[105, 5],[125, -10],[150, 0],[155, 25],[115, 40],[105, 5]]]
        ]
    },
    // ... 1942-1945 data continues similarly
};

// 4. LOCATIONS DATA
const locations = [
    { 
        year: 1939, 
        title: "Invasion of Poland", 
        coords: [52.22, 21.01], 
        img: "poland.jpg", 
        teaser: "The outbreak of WWII.", 
        significance: "Germany launched a blitzkrieg invasion of Poland, leading to British and French declarations of war.", 
        outcome: "Poland was occupied and divided between Germany and the USSR.", 
        casualties: "Approx. 66,000 Polish troops killed." 
    },
    { 
        year: 1941, 
        title: "Pearl Harbor", 
        coords: [21.36, -157.94], 
        img: "pearl.jpg", 
        teaser: "US Enters the War.", 
        significance: "A surprise Japanese air strike on the US Pacific Fleet.", 
        outcome: "Unified American public opinion for war.", 
        casualties: "2,403 Americans killed." 
    }
    // Add more locations as you find them!
];

// 5. THE CORE ENGINE
function updateMap() {
    markerGroup.clearLayers();
    territoryLayer.clearLayers();
    document.getElementById('display-year').innerText = currentYear;

    if (territoryData[currentYear]) {
        L.geoJSON(territoryData[currentYear], {
            style: {
                color: "#8b0000",
                fillColor: "#8b0000",
                fillOpacity: 0.22,
                weight: 2,
                dashArray: '6, 6'
            }
        }).addTo(territoryLayer);
    }

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

// 6. UI CONTROLS
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
        <h1 style="font-family:'Oswald'; border-bottom:4px solid #1a1510; letter-spacing:1px;">DOSSIER: ${loc.title}</h1>
        <div class="dossier-grid">
            <div>
                <img src="images/${loc.img}" style="width:100%; border:2px solid #000;" onerror="this.src='https://placehold.co/450x300/1a1510/d4c8a8?text=Archive+Photo'">
                <div class="stat-box">
                    <div style="font-family:'Oswald'; font-size:12px; color:var(--gold);">CASUALTY REPORT</div>
                    <div class="casualty-count">${loc.casualties}</div>
                </div>
            </div>
            <div>
                <h3 style="font-family:'Oswald'; margin-top:0;">HISTORICAL SIGNIFICANCE</h3>
                <p style="font-style:italic; font-size:14px;">"${loc.significance}"</p>
                <h3 style="font-family:'Oswald'; margin-top:20px;">OUTCOME</h3>
                <p style="font-size:14px;">${loc.outcome}</p>
            </div>
        </div>`;
    document.getElementById('history-modal').style.display = 'block';
}

function closeModal() { document.getElementById('history-modal').style.display = 'none'; }

updateMap();
setTimeout(() => { map.invalidateSize(); }, 500);
