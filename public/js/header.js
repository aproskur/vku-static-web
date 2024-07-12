const smallHeader = document.getElementById("small-header");
const largeHeader = document.getElementById("large-header");

// Debounce function to limit the rate at which the scroll function is called
function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Function to handle the scroll event
function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        smallHeader.style.opacity = "1";
        largeHeader.style.opacity = "0";
        setTimeout(() => {
            smallHeader.style.display = "flex";
            largeHeader.style.display = "none";
        }, 300); // Duration of the CSS transition
    } else {
        smallHeader.style.opacity = "0";
        largeHeader.style.opacity = "1";
        setTimeout(() => {
            smallHeader.style.display = "none";
            largeHeader.style.display = "block";
        }, 300); // Duration of the CSS transition
    }
}

// Function to add or remove the scroll event listener based on screen size
function handleResize() {
    if (window.innerWidth <= 900) {
        window.onscroll = debounce(scrollFunction, 50);
    } else {
        window.onscroll = null;
        // Reset headers to initial state
        smallHeader.style.display = "none";
        largeHeader.style.display = "block";
        smallHeader.style.opacity = "0";
        largeHeader.style.opacity = "1";
    }
}

// Initial check on load
document.addEventListener("DOMContentLoaded", function () {
    handleResize();
});

// Add the resize event listener
window.addEventListener('resize', handleResize);
