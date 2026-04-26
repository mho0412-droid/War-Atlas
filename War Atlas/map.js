/**
 * THE WAR ATLAS - FINAL VERSION
 * Uses Wikimedia Commons verified direct links for photos.
 */

// 1. INITIALIZE MAP
const map = L.map('map-container', {
    scrollWheelZoom: true,
    zoomSnap: 0.5,
    minZoom: 2
}).setView([30.0, 10.0], 2.5);

// 2. BACKGROUND TILES (Land/Water Contrast)
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    maxZoom: 19
}).addTo(map);

// 3. OVERLAY TILES (Borders & English Labels)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Labels &copy; Esri',
    maxZoom: 18
}).addTo(map);

// 4. VINTAGE STYLE (JS-only)
const mapDiv = document.getElementById('map-container');
if (mapDiv) {
    mapDiv.style.filter = "sepia(0.4) contrast(1.2) brightness(0.95)";
}

// 5. DATASET: VERIFIED PUBLIC DOMAIN LINKS
const locations = [
    { 
        title: "D-Day (Normandy)", 
        coords: [49.4144, -0.8322], 
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg/640px-Into_the_Jaws_of_Death_23-0455M_edit.jpg",
        desc: "June 6, 1944: Allied forces land in occupied France, beginning the liberation of Western Europe." 
    },
    { 
        title: "Pearl Harbor", 
        coords: [21.3648, -157.9492], 
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Attack_on_Carrier_Struck_at_Pearl_Harbor.jpg/640px-Attack_on_Carrier_Struck_at_Pearl_Harbor.jpg",
        desc: "Dec 7, 1941: The Japanese surprise attack on the U.S. Pacific Fleet at Pearl Harbor, Hawaii." 
    },
    { 
        title: "Battle of Stalingrad", 
        coords: [48.7080, 44.5133], 
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Ruined_Stalingrad.jpg/640px-Ruined_Stalingrad.jpg",
        desc: "1942–1943: A massive Soviet victory and the bloodiest battle in history, turning the tide on the Eastern Front." 
    }
];

// 6. CUSTOM MARKER ICON
const vintageIcon = L.divIcon({
    className: 'vintage-marker',
    html: '<div style="width: 14px; height: 14px; background: #000; border: 2px solid #c8941a; border-radius: 50%;"></div>',
    iconSize: [14, 14]
});

// 7. MARKER LOOP
locations.forEach(loc => {
    const popupContent = `
        <div style="width: 220px; font-family: sans-serif;">
            <img src="${loc.img}" style="width:100%; height:130px; object-fit:cover; border: 1px solid #000; margin-bottom: 8px;">
            <strong style="display: block; font-size: 16px; border-bottom: 1px solid #c8941a; margin-bottom: 5px;">${loc.title}</strong>
            <p style="font-size: 12px; line-height: 1.4;">${loc.desc}</p>
        </div>
    `;

    L.marker(loc.coords, { icon: vintageIcon })
        .addTo(map)
        .bindPopup(popupContent);
});

// 8. RENDER REFRESH
setTimeout(() => { map.invalidateSize(); }, 500);
