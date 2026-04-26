/**
 * THE WAR ATLAS - CHRONO-DOSSIER SYSTEM
 */

let currentYear = 1939;
const markerGroup = L.layerGroup(); 

// 1. INITIALIZE MAP
const map = L.map('map-container', {
    scrollWheelZoom: true,
    zoomSnap: 0.5,
    minZoom: 2
}).setView([25.0, 0.0], 2.5);

// 2. LAYERS
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png').addTo(map);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}').addTo(map);
markerGroup.addTo(map);

const mapDiv = document.getElementById('map-container');
if (mapDiv) mapDiv.style.filter = "sepia(0.4) contrast(1.2) brightness(0.95)";

// 3. COMPLETE DATASET (Add your 25 locations here)
const locations = [
    { 
        year: 1939,
        title: "Invasion of Poland", 
        coords: [52.2297, 21.0122], 
        img: "warsaw.jpg", 
        teaser: "The outbreak of total war in Europe.",
        significance: "Germany launched a blitzkrieg invasion, leading Britain and France to declare war.",
        outcome: "Polish military defeat; start of the Second World War.",
        casualties: "Approx. 66,000 Polish troops killed; 200,000+ civilians."
    },
    { 
        year: 1941,
        title: "Pearl Harbor", 
        coords: [21.3648, -157.9492], 
        img: "pearl.jpg",
        teaser: "The attack that brought the USA into the war.",
        significance: "Destroyed the myth of American isolation and unified the country for war.",
        outcome: "Tactical Japanese victory; strategic US mobilization.",
        casualties: "2,403 Americans killed; 1,178 wounded."
    },
    { 
        year: 1942,
        title: "Stalingrad", 
        coords: [48.7080, 44.5133], 
        img: "stalingrad.jpg", 
        teaser: "The turning point of the Eastern Front.",
        significance: "The first major defeat of the German Army; Axis momentum was halted permanently.",
        outcome: "Decisive Soviet Victory; German 6th Army destroyed.",
        casualties: "Estimated 1.1 million Soviet; 800,000 Axis casualties."
    },
    { 
        year: 1944,
        title: "D-Day (Normandy)", 
        coords: [49.4144, -0.8322], 
        img: "normandy.jpg", 
        teaser: "The liberation of Western Europe begins.",
        significance: "Allied forces breached Hitler's Atlantic Wall, opening the Western Front.",
        outcome: "Allied Victory; established beachhead in France.",
        casualties: "4,414 Allied deaths on day one; 10,000+ total casualties."
    }
];

// 4. MAP REFRESH LOGIC
function updateMap() {
    markerGroup.clearLayers();
    document.getElementById('display-year').innerText = currentYear;

    locations.forEach((loc, index) => {
        if (loc.year <= currentYear) {
            // Gold for current year, Black for past years
            const dotColor = (loc.year === currentYear) ? '#c8941a' : '#1a1510';
            
            const vintageIcon = L.divIcon({
                className: 'vintage-marker',
                html: `<div style="width:14px; height:14px; background:${dotColor}; border:2px solid #fff; border-radius:50%; box-shadow:0 0 5px rgba(0,0,0,0.4);"></div>`,
                iconSize: [14, 14]
            });

            const popupContent = `
                <div style="width:220px; font-family:sans-serif;">
                    <img src="images/${loc.img}" style="width:100%; height:110px; object-fit:cover; border:1px solid #000;" onerror="this.src='https://placehold.co/220x110/1a1510/d4c8a8?text=Photo+Pending'">
                    <div style="font-family:'Oswald'; font-size:16px; margin-top:8px; border-bottom:1px solid #c8941a;">[${loc.year}] ${loc.title}</div>
                    <p style="font-size:11px; margin:5px 0;">${loc.teaser}</p>
                    <button class="archive-btn" onclick="openArchive(${index})">Read Full Dossier</button>
                </div>
            `;

            L.marker(loc.coords, { icon: vintageIcon }).addTo(markerGroup).bindPopup(popupContent);
        }
    });
}

// 5. NAVIGATION
function changeYear(step) {
    const nextYear = currentYear + step;
    if (nextYear >= 1939 && nextYear <= 1945) {
        currentYear = nextYear;
        updateMap();
    }
}

// 6. ARCHIVE MODAL
function openArchive(index) {
    const loc = locations[index];
    const modal = document.getElementById('history-modal');
    const body = document.getElementById('modal-body');

    body.innerHTML = `
        <h1 style="font-family:'Oswald'; text-transform:uppercase; border-bottom:4px solid #1a1510;">Dossier: ${loc.title} (${loc.year})</h1>
        <div class="dossier-grid">
            <div>
                <img src="images/${loc.img}" style="width:100%; border:2px solid #000;" onerror="this.src='https://placehold.co/600x400/1a1510/d4c8a8?text=Archive+Photo'">
                <div class="stat-box">
                    <div style="font-family:'Oswald'; font-size:12px; color:#c8941a;">CASUALTY REPORT</div>
                    <div class="casualty-count">${loc.casualties}</div>
                </div>
            </div>
            <div>
                <h3 style="font-family:'Oswald'; margin:0;">SIGNIFICANCE</h3>
                <p style="font-style:italic;">${loc.significance}</p>
                <h3 style="font-family:'Oswald'; margin-top:20px;">OUTCOME</h3>
                <p>${loc.outcome}</p>
            </div>
        </div>
    `;
    modal.style.display = 'block';
}

function closeModal() { document.getElementById('history-modal').style.display = 'none'; }

// Init
updateMap();
setTimeout(() => { map.invalidateSize(); }, 500);
