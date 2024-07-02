document.addEventListener('DOMContentLoaded', function () {
    const mainHeader = document.querySelector('.main-header');
    const stickyHeader = document.querySelector('.mobile-sticky-header');

    function updateHeaderVisibility() {
        if (window.innerWidth > 768) { // Adjust the breakpoint as needed
            // Always show main header on desktop
            mainHeader.style.display = 'block';
            // Ensure sticky header is never shown on desktop
            stickyHeader.style.display = 'none';
        } else {
            // Ensure only main header is shown on mobile if no condition to show sticky header
            if (stickyHeader.dataset.visible === 'true') {
                mainHeader.style.display = 'none';
                stickyHeader.style.display = 'flex';
            } else {
                mainHeader.style.display = 'block';
                stickyHeader.style.display = 'none';
            }
        }
    }

    // Initial check
    updateHeaderVisibility();

    // Update on window resize
    window.addEventListener('resize', updateHeaderVisibility);


});
