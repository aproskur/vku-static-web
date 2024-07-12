document.addEventListener('DOMContentLoaded', () => {
    const runMobileScripts = () => {
        console.log("Script loaded for mobile");

        const menuItems = document.querySelectorAll(".main-menu--item");
        const mainHeader = document.querySelector('.main-header');
        //const stickyHeader = document.querySelector('.mobile-sticky-header');


        /*
        const getStickyHeaderHeight = () => {
            return stickyHeader ? stickyHeader.offsetHeight : 0;
        };

        const addMarginTop = (element, marginTop) => {
            element.style.marginTop = marginTop + 'px';
        };

        const removeMarginTop = (element) => {
            element.style.marginTop = '';
        };

        
        const updateMarginForContentBelowSticky = () => {
            if (!stickyHeader) return;

            const stickyHeaderHeight = getStickyHeaderHeight();

            const dropdownsVisible = Array.from(document.querySelectorAll('.dropdown')).some(dropdown => {
                return window.getComputedStyle(dropdown).getPropertyValue('display') !== 'none';
            });

            const productDropdownVisible = Array.from(document.querySelectorAll('.dropdown.dropdown-products')).some(dropdown => {
                return window.getComputedStyle(dropdown).getPropertyValue('display') === 'none';
            });

            const productDynamicHeadingVisible = Array.from(document.querySelectorAll('.product--dynamic-heading')).some(heading => {
                return window.getComputedStyle(heading).getPropertyValue('display') === 'none';
            });

            const contentBelowSticky = document.querySelector('.vku-menu');
            if ((contentBelowSticky && !dropdownsVisible) || (contentBelowSticky && productDropdownVisible && productDynamicHeadingVisible)) {
                addMarginTop(contentBelowSticky, stickyHeaderHeight);
            } else {
                removeMarginTop(contentBelowSticky);
            }
        }; */

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

        menuItems.forEach(item => {
            item.classList.add('closed'); // Initially all top level items have class closed. Managed with JS
            const dropdown = item.querySelector('.dropdown');

            if (dropdown && dropdown.classList.contains('dropdown-products')) {
                dropdown.style.display = 'block'; // Exception: make dropdown-products visible initially
            } else if (dropdown) {
                dropdown.style.display = "none"; // Initially hide other dropdowns
            }

            item.addEventListener('click', (event) => {
                event.stopPropagation();

                // Before toggling current item, iterate through menu and close all other items
                menuItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('opened')) {
                        otherItem.classList.remove('opened');
                        otherItem.querySelector('.dropdown').style.display = "none";

                        // Reset icon class for otherItem
                        const otherMenuIcon = otherItem.querySelector('.menu-icon-arrow');
                        if (otherMenuIcon) {
                            otherMenuIcon.classList.remove('menu-icon-line');
                        }

                        // Close all product-dropdowns
                        closeAllProductDropdowns();
                    }
                });

                // When other items are checked, current clicked item is opened
                item.classList.toggle('opened');
                if (dropdown) {
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                }
                // Toggle between .menu-icon-arrow and .menu-icon-line
                const menuIcon = item.querySelector('.menu-icon-arrow');
                if (menuIcon) {
                    menuIcon.classList.toggle('menu-icon-line');
                }

                // Update margins whenever a menu item is clicked
                updateMarginForContentBelowSticky();
            });
        });

        // Function to toggle dropdown visibility and hide heading
        const toggleDropdown = (dropdown, heading) => {
            heading.classList.toggle('opened');
            if (dropdown) {
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            }
            // Hide the entire .product--dynamic-heading when dropdown opens
            heading.style.display = dropdown.style.display === 'block' ? 'none' : 'flex';
        };

        // Handle nested product dropdowns
        const productHeadings = document.querySelectorAll('.product--dynamic-heading');
        let currentDropdown = null; // Track the currently open dropdown

        productHeadings.forEach(heading => {
            const productDropdown = heading.nextElementSibling;
            const scrollTargetHeading = heading.nextElementSibling.querySelector('.product-description-header');
            if (productDropdown) {
                productDropdown.style.display = "none"; // Initially hide all product dropdowns
                heading.addEventListener('click', (event) => {
                    event.stopPropagation();
                    // Close current dropdown if open another
                    if (currentDropdown && currentDropdown !== productDropdown) {
                        toggleDropdown(currentDropdown, currentDropdown.previousElementSibling);
                    }
                    // Toggle clicked dropdown
                    toggleDropdown(productDropdown, heading);
                    // Update current dropdown
                    currentDropdown = productDropdown;
                    /*
                                        // Switch on sticky header when a product dynamic heading is clicked
                                        if (mainHeader && stickyHeader) {
                                            mainHeader.style.display = 'none';
                                            stickyHeader.style.display = 'flex'; // Sticky header is initially display: none
                                            const stickyHeaderHeight = getStickyHeaderHeight();
                                            const scrollTargetPosition = scrollTargetHeading.getBoundingClientRect().top + window.scrollY - stickyHeaderHeight;
                    
                                            // Smooth scroll to the target heading position
                                            window.scrollTo({ top: scrollTargetPosition, behavior: 'smooth' });
                    
                                            updateMarginForContentBelowSticky();
                                        } */
                });

                // Handle clicks on product description header. (Hide dropdown)
                const productDescriptionHeader = productDropdown.querySelector('.product-description-header');
                if (productDescriptionHeader) {
                    productDescriptionHeader.addEventListener('click', (event) => {
                        event.stopPropagation();
                        productDropdown.style.display = 'none';
                        heading.style.display = 'flex'; // Restore product--dynamic-heading visibility

                        // Clear current dropdown
                        currentDropdown = null;
                    });
                }
            }
        });

        // Handle internal dropdowns within product descriptions
        const innerDropdownItems = document.querySelectorAll('.product-list-dropdown-item');
        innerDropdownItems.forEach(item => {
            const arrow = item.querySelector('.product-list-arrow-down');

            item.addEventListener('click', function (event) {
                event.stopPropagation();

                // Toggle the visibility of product-inner-dropdown
                const innerDropdown = this.querySelector('.product-inner-dropdown');
                if (innerDropdown) {
                    innerDropdown.classList.toggle('visible'); // Toggle a class for visibility control
                }

                // Toggle arrow rotation
                if (arrow) {
                    arrow.classList.toggle('rotate');
                }
            });
        });

        // Close product-inner-dropdowns and reset arrows on menu-item click
        menuItems.forEach(item => {
            item.addEventListener('click', (event) => {
                event.stopPropagation();



                // Before toggling current item, iterate through menu and close all other items
                menuItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('opened')) {
                        otherItem.classList.remove('opened');
                        otherItem.querySelector('.dropdown').style.display = "none";

                        // Reset icon class for otherItem
                        const otherMenuIcon = otherItem.querySelector('.menu-icon-arrow');
                        if (otherMenuIcon) {
                            otherMenuIcon.classList.remove('menu-icon-line');
                        }

                        // Close all product-inner-dropdowns for other top-level items
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
                    }
                });

                // when other items are checked, current clicked item is opened
                item.classList.toggle('opened');
                if (dropdown) {
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                }
                // Toggle between .menu-icon-arrow and .menu-icon-line
                const menuIcon = item.querySelector('.menu-icon-arrow');
                if (menuIcon) {
                    menuIcon.classList.toggle('menu-icon-line');
                }

                // Update margins whenever a menu item is clicked
                updateMarginForContentBelowSticky();
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', () => {
            if (currentDropdown) {
                toggleDropdown(currentDropdown, currentDropdown.previousElementSibling);
                currentDropdown = null;
            }
        });

        // Prevent clicks within the dropdown from closing the dropdown
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        });
    };

    if (window.innerWidth < 900) {
        runMobileScripts();
    } else {
        console.log("Script not loaded: screen width >= 900px");

        // Handle resizing to trigger script on mobile size
        window.addEventListener('resize', () => {
            if (window.innerWidth < 900) {
                runMobileScripts();
            }
        });
    }
});
