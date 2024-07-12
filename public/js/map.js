document.addEventListener('DOMContentLoaded', function () {
    // Function to show overlay
    function showOverlay(pointId, overlayId) {
        let point = document.getElementById(pointId);
        let overlay = document.getElementById(overlayId);

        if (point && overlay) {
            point.addEventListener('mouseover', function () {
                overlay.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });

            point.addEventListener('mouseout', function () {
                overlay.style.display = 'none';
                document.body.style.overflow = '';
            });
        } else {
            console.warn(`Element not found: ${point ? overlayId : pointId}`);
        }
    }

    // Function to check if the device is a desktop (screen width greater than 1024px)
    function isDesktop() {
        return window.innerWidth > 1024;
    }

    // Function to run your script if the device is a desktop
    function runScriptOnDesktop() {
        if (isDesktop()) {
            // Set up hover interactions
            showOverlay('point1', 'overlay1');
            //showOverlay('point2', 'overlay2');
            console.log('Running script on desktop');
        } else {
            console.log('Not a desktop. Script will not run.');
        }
    }

    // Initial check
    runScriptOnDesktop();

    // Event listener for window resize
    window.addEventListener('resize', runScriptOnDesktop);
});
