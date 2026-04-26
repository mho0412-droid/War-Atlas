/**
 * THE WAR ATLAS - COMPLETE LOGIC
 */

// 1. INITIALIZE MAP
const map = L.map('map-container', {
    scrollWheelZoom: true,
    zoomSnap: 0.5,
    minZoom: 2
}).setView([20.0, 10.0], 2.5);

// 2. THE BACKGROUND (Ocean/Land Contrast)
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

// 3. THE OVERLAY (Borders and English Labels)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Labels &copy; Esri',
    maxZoom: 18
}).addTo(map);

// 4. VINTAGE FILTER (Applied to the container)
const mapDiv = document.getElementById('map-container');
if (mapDiv) {
    mapDiv.style.filter = "sepia(0.4) contrast(1.3) brightness(0.95)";
}

// 5. THE GLOBAL 25 DATASET
const locations = [
    // EUROPE
    { title: "London, UK", coords: [51.5074, -0.1278], img: "london.jpg", desc: "Headquarters for Allied planning and the symbol of British resilience during the Blitz." },
    { title: "Normandy, France", coords: [49.4144, -0.8322], img: "normandy.jpg", desc: "Site of D-Day, the largest amphibious invasion in history, turning the tide in Western Europe." },
    { title: "Berlin, Germany", coords: [52.5200, 13.4050], img: "berlin.jpg", desc: "The center of Nazi power and the site of the final battle in the European theater." },
    { title: "Paris, France", coords: [48.8566, 2.3522], img: "paris.jpg", desc: "Liberated in August 1944 after four years of German occupation." },
    { title: "Warsaw, Poland", coords: [52.2297, 21.0122], img: "warsaw.jpg", desc: "The city where the war began and site of the heroic Warsaw Uprising." },
    { title: "Dunkirk, France", coords: [51.0344, 2.3768], img: "dunkirk.jpg", desc: "Location of the 'Miracle' evacuation of 338,000 Allied troops in 1940." },
    { title: "Auschwitz, Poland", coords: [50.0274, 19.2020], img: "auschwitz.jpg", desc: "The most notorious concentration camp; a central site of the Holocaust." },
    { title: "The Ardennes", coords: [50.1500, 5.5000], img: "bulge.jpg", desc: "The Battle of the Bulge: Hitler's last major offensive on the Western Front." },
    
    // EASTERN FRONT
    { title: "Stalingrad, USSR", coords: [48.7080, 44.5133], img: "stalingrad.jpg", desc: "The bloodiest battle in history; the decisive Soviet victory that broke the German Army." },
    { title: "Moscow, USSR", coords: [55.7558, 37.6173], img: "moscow.jpg", desc: "The Soviet capital where the German advance was finally halted in the winter of 1941." },
    { title: "Leningrad, USSR", coords: [59.9343, 30.3351], img: "leningrad.jpg", desc: "Endured a 900-day siege that resulted in the deaths of over 1 million civilians." },
    { title: "Kursk, USSR", coords: [51.7373, 36.1874], img: "kursk.jpg", desc: "Site of the largest tank battle ever fought, ending German hopes of offensive success in the East." },

    // PACIFIC & ASIA
    { title: "Pearl Harbor, USA", coords: [21.3648, -157.9492], img: "pearl.jpg", desc: "The surprise attack that drew the United States into World War II." },
    { title: "Midway Atoll", coords: [28.2101, -177.3761], img: "midway.jpg", desc: "The naval battle that eliminated Japan's carrier advantage in the Pacific." },
    { title: "Iwo Jima, Japan", coords: [24.7833, 141.3167], img: "iwojima.jpg", desc: "A key island captured by U.S. Marines to serve as an emergency landing strip for bombers." },
    { title: "Hiroshima, Japan", coords: [34.3853, 132.4546], img: "hiroshima.jpg", desc: "Target of the first atomic bomb, leading to Japan's unconditional surrender." },
    { title: "Nanjing, China", coords: [32.0603, 118.7969], img: "nanjing.jpg", desc: "Site of one of the war's worst atrocities during the Second Sino-Japanese War." },
    { title: "Singapore", coords: [1.3521, 103.8198], img: "singapore.jpg", desc: "Known as the 'Fall of Singapore,' Britain's greatest military defeat." },
    { title: "Guadalcanal", coords: [-9.4456, 159.9729], img: "guadalcanal.jpg", desc: "The first major land offensive by Allied forces against Japan." },

    // AFRICA & MEDITERRANEAN
    { title: "El Alamein, Egypt", coords: [30.8412, 28.9360], img: "elalamein.jpg", desc: "The battle that ended Axis hopes of occupying Egypt and the Suez Canal." },
    { title: "Rome, Italy", coords: [41.9028, 12.4964], img: "rome.jpg", desc: "The first Axis capital to be liberated by the Allies." },
    { title: "Monte Cassino, Italy", coords: [41.4900, 13.8142], img: "cassino.jpg", desc: "Site of a series of costly battles to break the German defensive line in Italy." },
    { title: "Casablanca, Morocco", coords: [33.5731, -7.5898], img: "casablanca.jpg", desc: "Site of the 1943 conference where Churchill and Roosevelt demanded 'unconditional surrender'." },

    // THE HOME FRONTS
    { title: "Washington D.C., USA", coords: [38.9072, -77.0369], img: "dc.jpg", desc: "The administrative center of the Allied war effort and the 'Arsenal of Democracy'." },
    { title: "Los Alamos, NM", coords: [35.8811, -106.3031], img: "losalamos.jpg", desc: "The secret laboratory where the first atomic bombs were designed and built." }
];

// 6. CUSTOM MARKER ICON
const vintageIcon = L.divIcon({
    className: 'vintage-marker',
    html: '<div style="width: 14px; height: 14px; background: #000; border: 2px solid #c8941a; border-radius: 50%;"></div>',
    iconSize: [14, 14]
});

// 7. LOOP: CREATE CLICKABLE MARKERS
locations.forEach(loc => {
    // Generate the internal HTML for the popup
    const popupContent = `
        <div style="width: 240px;">
            <img src="images/${loc.img}" class="popup-image" onerror="this.src='https://placehold.co/240x140/1a1510/d4c8a8?text=Photo+Unavailable'">
            <div class="popup-header">${loc.title}</div>
            <p class="popup-desc">${loc.desc}</p>
        </div>
    `;

    L.marker(loc.coords, { icon: vintageIcon })
        .addTo(map)
        .bindPopup(popupContent, { maxWidth: 260 });
});

// 8. RENDER REFRESH
setTimeout(() => { map.invalidateSize(); }, 500);
