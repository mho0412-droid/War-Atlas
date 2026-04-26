/**
 * THE WAR ATLAS - MAP SCRIPT (2026 Edition)
 * High-contrast borders, English labels, and interactive photo popups.
 */

// 1. INITIALIZE MAP
// Center on Europe/Atlantic, Zoom level 2.5 shows the global scale.
const map = L.map('map-container', {
    scrollWheelZoom: true,
    zoomSnap: 0.5,
    minZoom: 2
}).setView([30.0, 10.0], 2.5);

// 2. LAYER 1: LAND & WATER (Humanitarian Style)
// This gives us the contrasting color between countries and the ocean.
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    maxZoom: 19
}).addTo(map);

// 3. LAYER 2: BORDERS & ENGLISH LABELS (Esri Reference)
// This transparent layer adds the sharp country lines and English text on top.
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Labels &copy; Esri',
    maxZoom: 18
}).addTo(map);

// 4. THE VINTAGE ADJUSTMENT
// We apply a sepia tone and high contrast via JS to give it a 1939 feel.
const mapDiv = document.getElementById('map-container');
if (mapDiv) {
    mapDiv.style.filter = "sepia(0.35) contrast(1.25) brightness(0.95)";
}

// 5. DATASET: Historical Points with Images
const locations = [
    { 
        title: "D-Day (Normandy)", 
        coords: [49.4144, -0.8322], 
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg/800px-Into_the_Jaws_of_Death_23-0455M_edit.jpg",
        desc: "June 6, 1944: Allied forces land in occupied France, beginning the liberation of Western Europe." 
    },
    { 
        title: "Pearl Harbor", 
        coords: [21.3648, -157.9492], 
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/USS_Arizona_burning_at_Pearl_Harbor_1941.jpg/800px-USS_Arizona_burning_at_Pearl_Harbor_1941.jpg",
        desc: "Dec 7, 1941: The Japanese surprise attack on the U.S. Pacific Fleet at Pearl Harbor, Hawaii." 
    },
    { 
        title: "Battle of Stalingrad", 
        coords: [48.7080, 44.5133], 
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Stalingrad_ruins.jpg/800px-Stalingrad_ruins.jpg",
        desc: "1942–1943: A massive Soviet victory and the bloodiest battle in history, turning the tide on the Eastern Front." 
    }
];

// 6. CUSTOM MARKER ICON (The 'Ink Dot')
const vintageIcon = L.divIcon({
    className: 'vintage-marker',
    html: '<div style="width: 14px; height: 14px; background: #000; border: 2px solid #c8941a; border-radius: 50%; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>',
    iconSize: [14, 14]
});

// 7. LOOP: Add Markers with Photo Popups
locations.forEach(loc => {
    const popupContent = `
        <div style="width: 220px; font-family: 'Libre Baskerville', serif;">
            <img src="${loc.img}" style="width:100%; height:130px; object-fit:cover; filter: grayscale(100%) contrast(1.1); border: 1px solid #1a1510; margin-bottom: 8px;">
            <span style="font-family: 'Oswald', sans-serif; font-size: 16px; text-transform: uppercase; display: block; border-bottom: 1px solid #c8941a; margin-bottom: 5px;">${loc.title}</span>
            <p style="font-size: 12px; line-height: 1.4; color: #1a1510;">${loc.desc}</p>
        </div>
    `;

    L.marker(loc.coords, { icon: vintageIcon })
        .addTo(map)
        .bindPopup(popupContent);
});

// 8. FINAL RENDER FIX
// Forces the map to recalculate its size after the page loads.
setTimeout(() => { map.invalidateSize(); }, 500);
