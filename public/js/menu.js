document.addEventListener('DOMContentLoaded', () => {
    console.log("bzyk");
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

    menuItems.forEach(item => {
        item.classList.add('closed'); //initially all top level items have class closed. I manage this with js
        const dropdown = item.querySelector('.dropdown');
        console.log('dropdown', dropdown)
        dropdown.style.display = "none" //initially all dropdowns of top levelmenu items are not visible

        item.addEventListener('click', (event) => {
            console.log(item, 'clicked');
            event.stopPropagation();

            //Before toggling current item, iterate through menu and  close all other items
            menuItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('opened')) {
                    otherItem.classList.remove('opened');
                    otherItem.querySelector('.dropdown').style.display = "none";

                    // Reset icon class for otherItem
                    const otherMenuIcon = otherItem.querySelector('.menu-icon-arrow');
                    if (otherMenuIcon) {
                        otherMenuIcon.classList.remove('menu-icon-line');
                    }
                }
            });

            //when other items are checked, currecnt clicked item is opened
            item.classList.toggle('opened')
            if (dropdown) {
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            }
            // Toggle between .menu-icon-arrow and .menu-icon-line
            const menuIcon = item.querySelector('.menu-icon-arrow');
            if (menuIcon) {
                menuIcon.classList.toggle('menu-icon-line');
            }


        })
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
                //ANCHOR scroll here?
                if (mainHeader && stickyHeader) {
                    mainHeader.style.display = 'none';
                    stickyHeader.style.display = 'flex'; // sticky header is initially display: none
                    const stickyHeaderHeight = getStickyHeaderHeight();
                    console.log("HEADER height", stickyHeaderHeight)
                    const scrollTargetPosition = scrollTargetHeading.getBoundingClientRect().top + window.scrollY - stickyHeaderHeight;
                    window.scrollTo({ top: scrollTargetPosition, behavior: 'smooth' });
                    //scrollTargetHeading.scrollIntoView({ behaviour: 'smooth' })

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
        item.addEventListener('click', function (event) {
            event.stopPropagation();

            // Close all product-inner-dropdowns
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

            // Remove arrow rotation from all product-list-arrow-down icons
            const arrows = document.querySelectorAll('.product-list-arrow-down');
            arrows.forEach(arrow => {
                arrow.classList.remove('rotate');
            });


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


