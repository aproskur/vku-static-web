// app.js



document.addEventListener('DOMContentLoaded', function () {
    // Function to show overlay
    function showOverlay(pointId, overlayId) {
        let point = document.getElementById(pointId);
        let overlay = document.getElementById(overlayId);

        point.addEventListener('mouseover', function () {
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });

        point.addEventListener('mouseout', function () {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        });
    }

    // Set up hover interactions
    showOverlay('point1', 'overlay1');
    showOverlay('point2', 'overlay2');
});



