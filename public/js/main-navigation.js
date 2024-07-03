document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll(".main-menu--item");
    const mainHeader = document.querySelector('.main-header');
    const stickyHeader = document.querySelector('.mobile-sticky-header');

    // Function to get the height of the sticky header
    const getStickyHeaderHeight = () => {
        return stickyHeader ? stickyHeader.offsetHeight : 0;
    };

    // Function to add margin to an element
    const addMarginTop = (element, marginTop) => {
        element.style.marginTop = marginTop + 'px';
    };

    // Function to remove margin from an element
    const removeMarginTop = (element) => {
        element.style.marginTop = '';
    };

    // Update margin for content below sticky header based on dropdown visibility
    const updateMarginForContentBelowSticky = () => {
        if (!stickyHeader) {
            return; // Exit if no sticky header
        }

        const stickyHeaderHeight = getStickyHeaderHeight();

        // Check if any dropdown is visible
        const dropdownsVisible = Array.from(document.querySelectorAll('.dropdown')).some(dropdown => {
            return window.getComputedStyle(dropdown).getPropertyValue('display') !== 'none';
        });

        // Check if product dropdowns (with photo) are not visible but dynamic heading is visible
        const productDropdownVisible = Array.from(document.querySelectorAll('.dropdown.dropdown-products')).some(dropdown => {
            return window.getComputedStyle(dropdown).getPropertyValue('display') === 'none';
        });

        const productDynamicHeadingVisible = Array.from(document.querySelectorAll('.product--dynamic-heading')).some(heading => {
            return window.getComputedStyle(heading).getPropertyValue('display') !== 'none';
        });

        // Add margin if conditions are met
        const contentBelowSticky = document.querySelector('.vku-menu');
        if (contentBelowSticky && (!dropdownsVisible || (productDropdownVisible && productDynamicHeadingVisible))) {
            addMarginTop(contentBelowSticky, stickyHeaderHeight);
        } else {
            removeMarginTop(contentBelowSticky);
        }
    };

    // Function to close all product dropdowns and reset headings
    const closeAllProductDropdowns = () => {
        document.querySelectorAll('.dropdown.dropdown-products').forEach(productDropdown => {
            productDropdown.style.display = 'none';
            const heading = productDropdown.previousElementSibling;
            if (heading) {
                heading.style.display = 'flex';
            }
        });

        document.querySelectorAll('.product-dropdown').forEach(childDropdown => {
            childDropdown.style.display = 'none';
        });
    };

    // Function to toggle dropdown visibility and toggle heading display
    const toggleDropdown = (dropdown, heading) => {
        heading.classList.toggle('opened');
        if (dropdown) {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
        heading.style.display = dropdown.style.display === 'block' ? 'none' : 'flex';
    };

    // Handle clicks on main menu items
    menuItems.forEach(item => {
        item.classList.add('closed'); // Initially all top level items have class closed managed with JS
        const dropdown = item.querySelector('.dropdown');
        const menuIcon = item.querySelector('.menu-icon-arrow');

        // Display dropdown-products initially, hide others
        if (dropdown && dropdown.classList.contains('dropdown-products')) {
            dropdown.style.display = 'block';
            if (menuIcon) {
                menuIcon.classList.add('menu-icon-line'); // Display as line initially
            }
        } else if (dropdown) {
            dropdown.style.display = 'none';
        }

        // Click event listener for each menu item
        item.addEventListener('click', (event) => {
            event.stopPropagation();

            // Close other opened items
            menuItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('opened')) {
                    otherItem.classList.remove('opened');
                    otherItem.querySelector('.dropdown').style.display = "none";

                    const otherMenuIcon = otherItem.querySelector('.menu-icon-arrow');
                    if (otherMenuIcon) {
                        otherMenuIcon.classList.remove('menu-icon-line');
                    }

                    closeAllProductDropdowns();
                }
            });

            // Toggle current item
            item.classList.toggle('opened');
            if (dropdown) {
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            }

            // Toggle icon class
            if (menuIcon) {
                menuIcon.classList.toggle('menu-icon-line');
            }

            // Update margins
            updateMarginForContentBelowSticky();
        });
    });

    // Handle clicks on product dynamic headings
    const productHeadings = document.querySelectorAll('.product--dynamic-heading');
    let currentDropdown = null;

    productHeadings.forEach(heading => {
        const productDropdown = heading.nextElementSibling;
        if (productDropdown) {
            productDropdown.style.display = "none"; // Initially hide all product dropdowns

            heading.addEventListener('click', (event) => {
                event.stopPropagation();

                // Close current dropdown if another is opened
                if (currentDropdown && currentDropdown !== productDropdown) {
                    toggleDropdown(currentDropdown, currentDropdown.previousElementSibling);
                }

                // Toggle clicked dropdown
                toggleDropdown(productDropdown, heading);
                currentDropdown = productDropdown;

                // Switch to sticky header and scroll to target heading
                if (mainHeader && stickyHeader) {
                    mainHeader.style.display = 'none';
                    stickyHeader.style.display = 'flex'; // Show sticky header
                    const stickyHeaderHeight = getStickyHeaderHeight();
                    const scrollTargetPosition = heading.nextElementSibling.querySelector('.product-description-header').getBoundingClientRect().top + window.scrollY - stickyHeaderHeight;
                    window.scrollTo({ top: scrollTargetPosition, behavior: 'smooth' });
                    updateMarginForContentBelowSticky();
                }
            });

            // Handle clicks on product description headers
            const productDescriptionHeader = productDropdown.querySelector('.product-description-header');
            if (productDescriptionHeader) {
                productDescriptionHeader.addEventListener('click', (event) => {
                    event.stopPropagation();
                    productDropdown.style.display = 'none';
                    heading.style.display = 'flex'; // Restore heading visibility
                    currentDropdown = null;
                });
            }
        }
    });

    // Handle clicks on inner dropdown items
    const innerDropdownItems = document.querySelectorAll('.product-list-dropdown-item');
    innerDropdownItems.forEach(item => {
        const arrow = item.querySelector('.product-list-arrow-down');
        item.addEventListener('click', (event) => {
            event.stopPropagation();
            const innerDropdown = item.querySelector('.product-inner-dropdown');
            if (innerDropdown) {
                innerDropdown.classList.toggle('visible'); // Toggle visibility
            }
            if (arrow) {
                arrow.classList.toggle('rotate'); // Toggle arrow rotation
            }
        });
    });

    // Close all inner dropdowns and reset arrows on menu item click
    document.addEventListener('click', () => {
        if (currentDropdown) {
            toggleDropdown(currentDropdown, currentDropdown.previousElementSibling);
            currentDropdown = null;
        }
        innerDropdownItems.forEach(innerItem => {
            const innerDropdown = innerItem.querySelector('.product-inner-dropdown');
            if (innerDropdown && innerDropdown.classList.contains('visible')) {
                innerDropdown.classList.remove('visible');
            }
            const arrow = innerItem.querySelector('.product-list-arrow-down');
            if (arrow) {
                arrow.classList.remove('rotate');
            }
        });
    });

    // Prevent clicks within dropdown from closing it
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    });

});
