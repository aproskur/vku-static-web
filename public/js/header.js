let lastKnownScrollPosition = 0;
let ticking = false;

window.addEventListener('scroll', function () {
    if (isMobileDevice()) {
        lastKnownScrollPosition = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function () {
                scrollFunction(lastKnownScrollPosition);
                ticking = false;
            });
            ticking = true;
        }
    }
});

function isMobileDevice() {
    return window.innerWidth <= 900;
}

function scrollFunction(scrollPos) {
    if (scrollPos > 50) {
        document.getElementById("small-header").style.display = "flex";
        document.getElementById("large-header").style.display = "none";
    } else {
        document.getElementById("small-header").style.display = "none";
        document.getElementById("large-header").style.display = "block";
    }
}
