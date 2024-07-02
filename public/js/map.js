// app.js



// Function to show overlay
function showOverlay(pointId, overlayId) {
    var point = document.getElementById(pointId);
    var overlay = document.getElementById(overlayId);

    point.addEventListener('mouseover', function () {
        overlay.style.display = 'block';
    });

    point.addEventListener('mouseout', function () {
        overlay.style.display = 'none';
    });
}

point1.addEventListener('mouseover', function () {
    overlay1.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

point1.addEventListener('mouseout', function () {
    overlay1.style.display = 'none';
    document.body.style.overflow = '';
});

// Set up hover interactions
showOverlay('point1', 'overlay1');
showOverlay('point2', 'overlay2');


/*
// Function to show overlay
function showOverlay(pointId, overlayId) {
    var point = document.getElementById(pointId);
    var overlay = document.getElementById(overlayId);

    console.log('Setting up overlay for:', pointId, overlayId);

    point.addEventListener('mouseover', function () {
        console.log('Mouse over:', pointId);
        overlay.style.display = 'block';
        // Position overlay relative to the point
        var pointRect = point.getBoundingClientRect();
        console.log('Point rect:', pointRect);
        overlay.style.top = pointRect.top + window.scrollY + 'px';
        overlay.style.left = pointRect.left + window.scrollX + 'px';
    });

    point.addEventListener('mouseout', function () {
        console.log('Mouse out:', pointId);
        overlay.style.display = 'none';
    });
}

// Set up hover interactions
showOverlay('point1', 'overlay1');
showOverlay('point2', 'overlay2');
*/