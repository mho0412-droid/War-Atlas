// 1. Initialize the map
const map = L.map('map-container', {
    scrollWheelZoom: true,
    zoomSnap: 0.5
}).setView([30.0, 10.0], 2.5);

// 2. LAYER 1: The Base (Land/Water colors)
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    maxZoom: 19
}).addTo(map);

// 3. LAYER 2: The Borders & English Labels (High Contrast)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Labels &copy; Esri',
    maxZoom: 18
}).addTo(map);

// 4. APPLY THE VINTAGE FILTER (Via JS)
const mapDiv = document.getElementById('map-container');
if (mapDiv) {
    mapDiv.style.filter = "sepia(0.4) contrast(1.3) brightness(0.95)";
}

// 5. DATA WITH IMAGES
const locations = [
    { 
        title: "D-Day (Normandy)", 
        coords: [49.4144, -0.8322], 
        img: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg",
        desc: "June 6, 1944: Allied forces land in occupied France." 
    },
    { 
        title: "Pearl Harbor", 
        coords: [21.3648, -157.9492], 
        img: "https://upload.wikimedia.org/wikipedia/commons/1/1d/USS_Arizona_burning.jpg",
        desc: "Dec 7, 1941: Japan attacks the U.S. Pacific Fleet." 
    },
    { 
        title: "Stalingrad", 
        coords: [48.7080, 44.5133], 
        img: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Stalingrad_ruins.jpg",
        desc: "1942–1943: A brutal turning point on the Eastern Front." 
    }
];

// 6. CUSTOM ICON
const vintageIcon = L.divIcon({
    className: 'vintage-marker',
    html: '<div style="width: 14px; height: 14px; background: #000; border: 2px solid #c8941a; border-radius: 50%;"></div>',
    iconSize: [14, 14]
});

// 7. ADD MARKERS WITH PHOTO POPUPS
locations.forEach(loc => {
    const popupContent = `
        <div style="width: 200px;">
            <img src="${loc.img}" class="popup-img">
            <span class="popup-title">${loc.title}</span>
            <p class="popup-desc">${loc.desc}</p>
        </div>
    `;

    L.marker(loc.coords, { icon: vintageIcon })
        .addTo(map)
        .bindPopup(popupContent);
});

// Force refresh
setTimeout(() => { map.invalidateSize(); }, 400);
