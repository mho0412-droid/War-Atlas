/**
 * THE WAR ATLAS - GLOBAL 25 EDITION
 * Full-screen interactive atlas with sharp borders and English labels.
 */

// 1. INITIALIZE MAP
const map = L.map('map-container', {
    scrollWheelZoom: true,
    zoomSnap: 0.5,
    minZoom: 2
}).setView([20.0, 10.0], 2.5);

// 2. THE BACKGROUND (Contrast Land & Water)
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
}).addTo(map);

// 3. THE BORDERS & ENGLISH LABELS (The "Ink" Layer)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Labels &copy; Esri',
    maxZoom: 18
}).addTo(map);

// 4. THE VINTAGE ADJUSTMENT
const mapDiv = document.getElementById('map-container');
if (mapDiv) {
    mapDiv.style.filter = "sepia(0.4) contrast(1.3) brightness(0.95) saturate(0.9)";
}

// 5. DATASET: 25 KEY LOCATIONS
const locations = [
    // --- EUROPE & ATLANTIC ---
    { title: "London, UK", coords: [51.5074, -0.1278], desc: "Command center for the Western Allies and target of the Blitz." },
    { title: "Normandy, France", coords: [49.4144, -0.8322], desc: "June 6, 1944: The D-Day landings begin the liberation of Europe." },
    { title: "Dunkirk, France", coords: [51.0344, 2.3768], desc: "Site of the massive Allied evacuation in 1940." },
    { title: "Berlin, Germany", coords: [52.5200, 13.4050], desc: "The capital of Nazi Germany and the final objective in Europe." },
    { title: "Paris, France", coords: [48.8566, 2.3522], desc: "Occupied in June 1940; liberated in August 1944." },
    { title: "Warsaw, Poland", coords: [52.2297, 21.0122], desc: "Where the war began with the German invasion in Sept 1939." },
    { title: "Auschwitz, Poland", coords: [50.0274, 19.2020], desc: "The largest of the Nazi concentration and extermination camps." },
    { title: "The Ardennes", coords: [50.1500, 5.5000], desc: "Site of the Battle of the Bulge, the final German offensive." },

    // --- EASTERN FRONT ---
    { title: "Stalingrad, USSR", coords: [48.7080, 44.5133], desc: "The decisive turning point on the Eastern Front (1942-1943)." },
    { title: "Moscow, USSR", coords: [55.7558, 37.6173], desc: "The Soviet capital; successfully defended against Operation Barbarossa." },
    { title: "Leningrad, USSR", coords: [59.9343, 30.3351], desc: "Survived a brutal 900-day siege by Axis forces." },
    { title: "Kursk, USSR", coords: [51.7373, 36.1874], desc: "Site of the largest tank battle in history (1943)." },

    // --- PACIFIC & ASIA ---
    { title: "Pearl Harbor, USA", coords: [21.3648, -157.9492], desc: "Dec 7, 1941: Japan's attack brings the U.S. into the war." },
    { title: "Midway Atoll", coords: [28.2101, -177.3761], desc: "A pivotal naval victory for the U.S. in June 1942." },
    { title: "Iwo Jima, Japan", coords: [24.7833, 141.3167], desc: "Scene of fierce fighting during the U.S. island-hopping campaign." },
    { title: "Hiroshima, Japan", coords: [34.3853, 132.4546], desc: "August 6, 1945: The first use of an atomic weapon in war." },
    { title: "Nanjing, China", coords: [32.0603, 118.7969], desc: "Target of the brutal 1937 massacre during the Second Sino-Japanese War." },
    { title: "Singapore", coords: [1.3521, 103.8198], desc: "The 'Gibraltar of the East,' captured by Japan in Feb 1942." },
    { title: "Guadalcanal", coords: [-9.4456, 159.9729], desc: "The first major Allied offensive against the Empire of Japan." },

    // --- MEDITERRANEAN & AFRICA ---
    { title: "El Alamein, Egypt", coords: [30.8412, 28.9360], desc: "Decisive British victory over Rommel's Afrika Korps." },
    { title: "Rome, Italy", coords: [41.9028, 12.4964], desc: "The first Axis capital to be liberated by Allied forces (June 1944)." },
    { title: "Monte Cassino, Italy", coords: [41.4900, 13.8142], desc: "Site of a series of costly Allied assaults on the Gustav Line." },
    { title: "Casablanca, Morocco", coords: [33.5731, -7.5898], desc: "Location of the 1943 conference to plan the Allied strategy." },

    // --- THE AMERICAS ---
    { title: "Washington D.C., USA", coords: [38.9072, -77.0369], desc: "Political heart of the 'Arsenal of Democracy'." },
    { title: "Los Alamos, NM", coords: [35.8811, -106.3031], desc: "Top-secret laboratory of the Manhattan Project." }
];

// 6. CUSTOM ICON
const vintageIcon = L.divIcon({
    className: 'vintage-marker',
    html: '<div style="width: 12px; height: 12px; background: #000; border: 2px solid #c8941a; border-radius: 50%;"></div>',
    iconSize: [12, 12]
});

// 7. LOOP: ADD MARKERS
locations.forEach(loc => {
    L.marker(loc.coords, { icon: vintageIcon })
        .addTo(map)
        .bindPopup(`
            <div style="width: 180px; font-family: sans-serif;">
                <strong style="display: block; font-size: 14px; border-bottom: 1px solid #c8941a; margin-bottom: 5px; text-transform: uppercase;">${loc.title}</strong>
                <p style="font-size: 12px; line-height: 1.4; margin: 0;">${loc.desc}</p>
            </div>
        `);
});

// 8. RENDER FIX
setTimeout(() => { map.invalidateSize(); }, 500);
