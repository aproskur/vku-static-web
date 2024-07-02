document.addEventListener('DOMContentLoaded', function () {
    // Get the sticky header element
    const stickyHeader = document.querySelector('.mobile-sticky-header');
    console.log("GOt sticky header", stickyHeader);

    // Get the sibling element that should have dynamic padding
    const siblingElement = document.querySelector('.vku-menu');
    console.log("got MENU", siblingElement);

    // Function to add padding dynamically
    function addDynamicPadding() {
        // Get the height of the sticky header
        const headerHeight = stickyHeader.offsetHeight;
        console.log("header height", headerHeight);

        // Add padding-top to the sibling element
        siblingElement.style.paddingTop = headerHeight + 'px';
        console.log("paddingcalc", siblingElement.style.paddingTop);
    }

    // Call the function initially
    addDynamicPadding();

    // Add event listener to window resize (optional)
    window.addEventListener('resize', addDynamicPadding);
});
