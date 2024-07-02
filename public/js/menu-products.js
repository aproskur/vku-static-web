document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.menu-item');

    let currentProductDescription = null;
    let currentProduct = null;
    let currentDropdownItem = null; // Track currently opened product-list-dropdown-item

    // Initially close all menu items
    menuItems.forEach(item => {
        item.classList.add('closed'); // Add 'closed' class initially
        const dropdown = item.querySelector('.dropdown');
        if (dropdown) {
            dropdown.style.display = 'none'; // Hide dropdown initially
            item.classList.add('has-dropdown');
        }

        // Add click event listener to toggle classes and dropdown visibility
        item.addEventListener('click', function (event) {
            event.stopPropagation();

            // Close all other menu items
            menuItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('opened')) {
                    otherItem.classList.remove('opened');
                    otherItem.classList.add('closed');
                    const otherDropdown = otherItem.querySelector('.dropdown');
                    if (otherDropdown) {
                        otherDropdown.style.display = 'none';
                    }
                    const otherIcon = otherItem.querySelector('.menu-icon-line');
                    if (otherIcon) {
                        otherIcon.classList.remove('menu-icon-line');
                        otherIcon.classList.add('menu-icon-arrow');
                    }
                }
            });

            // Toggle the clicked menu item
            this.classList.toggle('opened');
            this.classList.toggle('closed');
            if (dropdown) {
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            }

            // Change the icon of the clicked menu item
            const icon = this.querySelector('.menu-icon-arrow, .menu-icon-line');
            if (icon) {
                icon.classList.toggle('menu-icon-arrow');
                icon.classList.toggle('menu-icon-line');
            }

            // Close all product descriptions and reset products
            if (currentProductDescription) {
                currentProductDescription.style.display = 'none';
                currentProductDescription = null;
            }
            if (currentProduct) {
                currentProduct.style.display = 'flex';
                currentProduct = null;
            }

            // Close the currently opened product-list-dropdown-item
            if (currentDropdownItem && currentDropdownItem !== item) {
                const dropdownItem = currentDropdownItem.querySelector('.product-list-dropdown-item');
                if (dropdownItem) {
                    dropdownItem.classList.remove('opened');
                    const innerDropdown = dropdownItem.querySelector('.product-inner-dropdown');
                    if (innerDropdown) {
                        innerDropdown.classList.remove('visible');
                    }
                    const arrow = dropdownItem.querySelector('.product-list-arrow-down');
                    if (arrow) {
                        arrow.classList.remove('rotate');
                    }
                }
            }

            // Update currentDropdownItem to the clicked dropdown item
            currentDropdownItem = item;
        });
    });

    // Add event listener for dropdown items
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.stopPropagation();

            // Hide the previously shown product description and show its product
            if (currentProductDescription) {
                currentProductDescription.style.display = 'none';
            }
            if (currentProduct) {
                currentProduct.style.display = 'flex';
            }

            // Show the clicked product description
            const productDescription = this.querySelector('.product-description');
            const product = this.querySelector('.product');

            if (product) {
                product.style.display = 'none';
                currentProduct = product;
            }
            if (productDescription) {
                productDescription.style.display = 'block';
                currentProductDescription = productDescription;

                // Scroll to the product description
                const productDescriptionHeader = productDescription.querySelector('h3');
                if (productDescriptionHeader) {
                    productDescriptionHeader.scrollIntoView({ behavior: 'smooth' });
                    // Calculate offset and adjust scroll position
                    const stickyHeaderHeight = document.querySelector('.mobile-sticky-header').offsetHeight;
                    console.log("HEADER height", stickyHeaderHeight);
                    window.scrollBy(0, -stickyHeaderHeight);
                }

                // Add sticky header and hide start header
                const startHeader = document.querySelector('.main-header');
                const stickyHeader = document.querySelector('.mobile-sticky-header');

                if (startHeader && stickyHeader) {
                    startHeader.style.display = 'none';
                    stickyHeader.style.display = 'flex'; //sticky header is initially display:none
                }
            }

            // Close the currently opened product-list-dropdown-item
            if (currentDropdownItem && currentDropdownItem !== item) {
                const dropdownItem = currentDropdownItem.querySelector('.product-list-dropdown-item');
                if (dropdownItem) {
                    dropdownItem.classList.remove('opened');
                    const innerDropdown = dropdownItem.querySelector('.product-inner-dropdown');
                    if (innerDropdown) {
                        innerDropdown.classList.remove('visible');
                    }
                    const arrow = dropdownItem.querySelector('.product-list-arrow-down');
                    if (arrow) {
                        arrow.classList.remove('rotate');
                    }
                }
            }

            // Update currentDropdownItem to the clicked dropdown item
            currentDropdownItem = item;
        });
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
});
