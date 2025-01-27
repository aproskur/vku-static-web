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

// Handle scroll behavior
const handleScroll = throttle(function (scrollPos) {
    if (isMobileDevice()) {
        const smallHeader = document.getElementById("small-header");
        const largeHeader = document.getElementById("large-header");

        if (scrollPos > 150) {
            // Show small header, hide large header
            smallHeader?.classList.remove("hidden");
            smallHeader?.classList.add("visible");
            largeHeader?.classList.remove("visible");
            largeHeader?.classList.add("hidden");
        } else {
            // Hide small header, show large header
            smallHeader?.classList.remove("visible");
            smallHeader?.classList.add("hidden");
            largeHeader?.classList.remove("hidden");
            largeHeader?.classList.add("visible");
        }
    }
}, 150);

// Function to check if the device is mobile
function isMobileDevice() {
    return window.innerWidth <= 900;
}

// Attach scroll event
window.addEventListener('scroll', function () {
    const scrollPos = window.scrollY || window.pageYOffset;
    handleScroll(scrollPos);
});

// Initial check on page load
document.addEventListener("DOMContentLoaded", function () {
    const scrollPos = window.scrollY || window.pageYOffset;
    handleScroll(scrollPos);
});
