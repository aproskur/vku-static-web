document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.menu-item');
    let currentProductDescription = null;
    let currentProduct = null;

    // Initially close all menu items
    menuItems.forEach(item => {
        item.classList.add('closed'); // Add 'closed' class initially
        const dropdown = item.querySelector('.dropdown');
        if (dropdown) {
            dropdown.style.display = 'none'; // Hide dropdown initially
            item.classList.add('has-dropdown');
        }

        // Add click event listener to toggle classes and dropdown visibility
        item.addEventListener('click', function () {
            // Close all other menu items
            menuItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('opened')) {
                    otherItem.classList.remove('opened');
                    otherItem.classList.add('closed');
                    const otherDropdown = otherItem.querySelector('.dropdown');
                    if (otherDropdown) {
                        otherDropdown.style.display = 'none';
                    }
                    // Change icon back to arrow
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

            // Close all inner dropdowns within product descriptions
            const innerDropdowns = document.querySelectorAll('.product-desc-inner-dropdown');
            innerDropdowns.forEach(innerDropdown => {
                innerDropdown.style.display = 'none';
            });
        });
    });

    // Add event listener for dropdown items
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent the menu item click event from triggering

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
            const arrow = this.querySelector('.arrow');
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
                }
            }

            // Close all inner dropdowns within product descriptions
            const innerDropdowns = document.querySelectorAll('.product-desc-inner-dropdown');
            innerDropdowns.forEach(innerDropdown => {
                innerDropdown.style.display = 'none';
            });
        });
    });

    // Handle internal dropdowns within product descriptions
    const innerDropdownItems = document.querySelectorAll('.product-list-dropdown-item');

    // Add click event listener to each dropdown item
    innerDropdownItems.forEach(item => {
        const arrow = item.querySelector('.product-list-arrow-down');

        item.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent click event from bubbling up

            // Toggle the visibility of product-inner-dropdown
            const innerDropdown = this.querySelector('.product-inner-dropdown');
            if (innerDropdown) {
                innerDropdown.classList.toggle('visible'); // Toggle a class for visibility control
            }

            // Toggle arrow rotation
            if (arrow) {
                arrow.classList.toggle('rotate');
            }

            // Log a message to the console for verification
            console.log('Dropdown item clicked:', this);
        });
    });

    // Add click event listener to close product-inner-dropdown on menu-item click

    menuItems.forEach(item => {
        item.addEventListener('click', function (event) {
            // Close all product-inner-dropdowns
            innerDropdownItems.forEach(innerItem => {
                const innerDropdown = innerItem.querySelector('.product-inner-dropdown');
                if (innerDropdown && innerDropdown.classList.contains('visible')) {
                    innerDropdown.classList.remove('visible');
                }
            });

            // Remove arrow rotation
            const arrows = document.querySelectorAll('.product-list-arrow-down');
            arrows.forEach(arrow => {
                arrow.classList.remove('rotate');
            });
        });
    });
});