/**
 * THE WAR ATLAS - INTERACTIVE DOSSIER EDITION
 */

// 1. INITIALIZE MAP
const map = L.map('map-container', {
    scrollWheelZoom: true,
    zoomSnap: 0.5,
    minZoom: 2
}).setView([20.0, 10.0], 2.5);

// 2. LAYERS (Contrast Sandwich)
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png').addTo(map);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}').addTo(map);

// 3. VINTAGE FILTER
const mapDiv = document.getElementById('map-container');
if (mapDiv) mapDiv.style.filter = "sepia(0.4) contrast(1.3) brightness(0.95)";

// 4. DATASET (Expanded for Deep Dive)
const locations = [
    { 
        title: "Stalingrad", 
        coords: [48.7080, 44.5133], 
        img: "stalingrad.jpg", 
        teaser: "The bloodiest battle in history and the turning point of the war.",
        significance: "Stalingrad halted the German advance into the Soviet Union and marked the first major surrender of a German Field Marshal. It destroyed the myth of German invincibility.",
        outcome: "Decisive Soviet Victory. The German 6th Army was completely encircled and destroyed.",
        casualties: "Estimated 1.1 million Soviet, 800,000 Axis (Total approx. 2 million)."
    },
    { 
        title: "D-Day (Normandy)", 
        coords: [49.4144, -0.8322], 
        img: "normandy.jpg", 
        teaser: "The massive Allied invasion of Nazi-occupied Europe.",
        significance: "Operation Overlord opened a critical second front in Western Europe, forcing Germany to fight a two-front war it could not win. It led to the liberation of Paris.",
        outcome: "Allied Victory. Successful beachhead established across five sectors (Omaha, Utah, Gold, Juno, Sword).",
        casualties: "Allied: 10,000+ on day one. German: Approx. 4,000–9,000 on day one."
    },
    { 
        title: "Pearl Harbor", 
        coords: [21.3648, -157.9492], 
        img: "pearl.jpg", 
        teaser: "The surprise attack that drew the United States into the global conflict.",
        significance: "The attack unified U.S. public opinion for war. While a tactical success for Japan, it failed to destroy American aircraft carriers, which were at sea at the time.",
        outcome: "Tactical Japanese Victory. Major damage to the U.S. Pacific Fleet, but sparked the 'Arsenal of Democracy'.",
        casualties: "U.S.: 2,403 killed. Japan: 64 killed."
    },
    { 
        title: "Hiroshima", 
        coords: [34.3853, 132.4546], 
        img: "hiroshima.jpg", 
        teaser: "The first use of an atomic weapon in warfare.",
        significance: "Used to force an immediate Japanese surrender without a costly invasion of the home islands. It inaugurated the Atomic Age and the Cold War power dynamic.",
        outcome: "Immediate strategic destruction. Led to Japan's unconditional surrender days later.",
        casualties: "Estimated 70,000–140,000 deaths (mostly civilian)."
    }
    // Note: You can add significance/outcome/casualties for the rest of your 25 locations here!
];

// 5. ICON
const vintageIcon = L.divIcon({
    className: 'vintage-marker',
    html: '<div style="width: 14px; height: 14px; background: #000; border: 2px solid #c8941a; border-radius: 50%;"></div>',
    iconSize: [14, 14]
});

// 6. POPUP & MODAL LOGIC
locations.forEach((loc, index) => {
    const popupContent = `
        <div style="width: 220px;">
            <img src="images/${loc.img}" style="width:100%; height:120px; object-fit:cover; border:1px solid #000;" onerror="this.src='https://placehold.co/220x120/1a1510/d4c8a8?text=Archive+Photo'">
            <div style="font-family:'Oswald'; font-size:16px; text-transform:uppercase; margin-top:8px; border-bottom:1px solid #c8941a;">${loc.title}</div>
            <p style="font-size:12px; line-height:1.4; margin:5px 0;">${loc.teaser}</p>
            <button class="archive-btn" onclick="openArchive(${index})">Open Archive Dossier</button>
        </div>
    `;

    L.marker(loc.coords, { icon: vintageIcon }).addTo(map).bindPopup(popupContent);
});

// 7. ARCHIVE MODAL FUNCTIONS
function openArchive(index) {
    const loc = locations[index];
    const modal = document.getElementById('history-modal');
    const body = document.getElementById('modal-body');

    body.innerHTML = `
        <h1 style="font-family:'Oswald'; text-transform:uppercase; letter-spacing:2px; border-bottom:4px solid #1a1510; padding-bottom:10px;">
            Archive: ${loc.title}
        </h1>
        
        <div class="dossier-grid">
            <div>
                <img src="images/${loc.img}" style="width:100%; border:2px solid #1a1510; box-shadow: 10px 10px 0px rgba(0,0,0,0.1);" onerror="this.src='https://placehold.co/600x400/1a1510/d4c8a8?text=Historical+Photo'">
                
                <div class="stat-box">
                    <div class="stat-label">Casualty Report</div>
                    <div class="casualty-count">${loc.casualties || "Data Pending..."}</div>
                </div>
            </div>
            
            <div>
                <h3 style="font-family:'Oswald'; text-transform:uppercase; margin:0;">Historical Significance</h3>
                <p style="font-style:italic; line-height:1.6;">"${loc.significance || "Pending archive research..."}"</p>
                
                <h3 style="font-family:'Oswald'; text-transform:uppercase; margin-top:25px;">Final Outcome</h3>
                <p style="line-height:1.6;">${loc.outcome || "Pending..."}</p>

                <div style="margin-top:30px; border-top:1px solid #ccc; padding-top:15px; font-size:12px; color:#666;">
                    CLASSIFIED DOCUMENT // WAR OFFICE 1945 // NO DUPLICATION
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('history-modal').style.display = 'none';
}

// 8. FINAL FIX
setTimeout(() => { map.invalidateSize(); }, 500);
