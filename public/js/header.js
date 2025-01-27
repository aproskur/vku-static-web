let ticking = false;

// Throttle function to limit the rate at which scroll events trigger
function throttle(callback, delay) {
    let lastCall = 0;
    return function () {
        const now = new Date().getTime();
        if (now - lastCall >= delay) {
            lastCall = now;
            callback.apply(null, arguments);
        }
    };
}

// Debounced scroll handler
const handleScroll = throttle(function (scrollPos) {
    if (isMobileDevice()) {
        if (scrollPos > 150) {
            // Show small header, hide large header
            setHeaderClass("small-header", "visible");
            setHeaderClass("large-header", "hidden");
        } else {
            // Hide small header, show large header
            setHeaderClass("small-header", "hidden");
            setHeaderClass("large-header", "visible");
        }
    }
}, 150);

// Function to set header class
function setHeaderClass(headerId, className) {
    const header = document.getElementById(headerId);
    if (header) {
        header.classList.remove("visible", "hidden");
        header.classList.add(className);
    }
}

// Attach debounced function to scroll event
window.addEventListener('scroll', function () {
    const scrollPos = window.scrollY || window.pageYOffset;
    handleScroll(scrollPos);
});

// Function to check if the device is mobile
function isMobileDevice() {
    return window.innerWidth <= 900;
}
