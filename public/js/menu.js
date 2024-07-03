document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll(".main-menu--item");
    const mainHeader = document.querySelector('.main-header');
    const stickyHeader = document.querySelector('.mobile-sticky-header');

    const getStickyHeaderHeight = () => {
        const stickyHeader = document.querySelector('.mobile-sticky-header');
        return stickyHeader ? stickyHeader.offsetHeight : 0;
    };

    // Function to add margin to the top of an element
    const addMarginTop = (element, marginTop) => {
        element.style.marginTop = marginTop + 'px';
    };

    // Function to remove margin from the top of an element
    const removeMarginTop = (element) => {
        element.style.marginTop = '';
    };


    const updateMarginForContentBelowSticky = () => {
        if (!stickyHeader) {
            return; // Exit the function if there is no sticky header
        }

        const stickyHeaderHeight = getStickyHeaderHeight();

        //TO ADD margin-top to .vku-menu Dropdowns of main menu should NOT be visible 
        const dropdownsVisible = Array.from(document.querySelectorAll('.dropdown')).some(dropdown => {
            console.log(`Checking visibility for`, dropdown);
            return window.getComputedStyle(dropdown).getPropertyValue('display') !== 'none';
        });

        //TO ADD margin-top to .vku-menu product-dropdowns(with photo) NOT visible but (&&) product-dynamic heading visible
        const productDropdownVisible = Array.from(document.querySelectorAll('.dropdown.dropdown-products')).some(dropdown => {
            return window.getComputedStyle(dropdown).getPropertyValue('display') === 'none';
        });

        const productDynamicHeadingVisible = Array.from(document.querySelectorAll('.product--dynamic-heading')).some(heading => {
            return window.getComputedStyle(heading).getPropertyValue('display') === 'none';
        });



        // REVISE THE CONDITIONS!!!! 
        //CONDITION to add margin-top when product--dynamic-heading VISIBLE && productDropdown(with foto) NOT Visible 
        //OR REMOVE THEM ??

        // Add margin to content below sticky header if product headers are not visible and all menu items are closed
        const contentBelowSticky = document.querySelector('.vku-menu');
        console.log(`Dropdowns visible: ${dropdownsVisible}`);
        if ((contentBelowSticky && !dropdownsVisible) || (contentBelowSticky && productDropdownVisible && productDynamicHeadingVisible)) {
            addMarginTop(contentBelowSticky, stickyHeaderHeight);
        } else {
            removeMarginTop(contentBelowSticky);
        }
    };



    // TODO DOESN"T WORK
    const closeAllProductDropdowns = () => {
        // Close all product-dropdowns and reset headings
        document.querySelectorAll('.dropdown.dropdown-products').forEach(productDropdown => {
            productDropdown.style.display = 'none';
            const heading = productDropdown.previousElementSibling;
            if (heading) {
                heading.style.display = 'flex';
            }
        });

        // Close all child product-dropdons .dropdown-product
        document.querySelectorAll('.product-dropdown').forEach(childDropdown => {
            childDropdown.style.display = 'none';
        });
    };


    menuItems.forEach(item => {
        item.classList.add('closed'); //initially all top level items have class closed. I manage this with js
        const dropdown = item.querySelector('.dropdown');

        // Check if the dropdown is of type dropdown-products
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
        const scrollTargetHeading = heading.nextElementSibling.querySelector('.product-description-header')
        console.log("scroll to", scrollTargetHeading);
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

                // Switch on sticky header when a product dynamic heading is clicked
                //ANCHOR scroll here
                if (mainHeader && stickyHeader) {
                    mainHeader.style.display = 'none';
                    stickyHeader.style.display = 'flex'; // Sticky header is initially display: none
                    const stickyHeaderHeight = getStickyHeaderHeight();
                    const scrollTargetPosition = scrollTargetHeading.getBoundingClientRect().top + window.scrollY - stickyHeaderHeight;

                    // Smooth scroll to the target heading position
                    window.scrollTo({ top: scrollTargetPosition, behavior: 'smooth' });

                    updateMarginForContentBelowSticky();
                    /*
                    // Check if both .product--dynamic-heading and .product-description-header are not visible
                    const productDynamicHeadingVisible = document.querySelector('.product--dynamic-heading');
                    const productDescriptionHeaderVisible = document.querySelector('.product-description-header');
                    const isProductVisible = productDynamicHeadingVisible &&
                        window.getComputedStyle(productDynamicHeadingVisible).getPropertyValue('display') !== 'none' &&
                        productDescriptionHeaderVisible &&
                        window.getComputedStyle(productDescriptionHeaderVisible).getPropertyValue('display') !== 'none';
            
                    const allMenuClosed = !document.querySelector('.main-menu--item.opened'); */

                    // Check if .dropdown.product-dropdown or .dropdown elements are visible
                }


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
            console.log(item, 'clicked');
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
});


