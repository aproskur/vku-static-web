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
            setHeaderStyle("small-header", "flex");
            setHeaderStyle("large-header", "none");
        } else {
            setHeaderStyle("small-header", "none");
            setHeaderStyle("large-header", "block");
        }
    }
}, 150);

// Function to set header style
function setHeaderStyle(headerId, displayValue) {
    const header = document.getElementById(headerId);
    if (header) {
        header.style.display = displayValue;
    }
}

// Ensure the proper header visibility right on page load
document.addEventListener("DOMContentLoaded", function () {
    const scrollPos = window.scrollY || window.pageYOffset;
    handleScroll(scrollPos); // Initial check to hide/show headers based on the scroll position
});

// Attach debounced function to scroll event
window.addEventListener('scroll', function () {
    const scrollPos = window.scrollY || window.pageYOffset;
    handleScroll(scrollPos);
});

// Function to check if the device is mobile
function isMobileDevice() {
    return window.innerWidth <= 900;
}
