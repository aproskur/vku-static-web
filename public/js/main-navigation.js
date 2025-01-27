document.addEventListener('DOMContentLoaded', () => {
    const runMobileScripts = () => {
        console.log("Script loaded for mobile");
        let lastOpenedProduct = null;


        // Helper function to toggle dropdowns
        const toggleDropdown = (dropdown, heading, forceClose = false) => {
            if (!dropdown) return;

            const isHidden = dropdown.classList.contains('hidden');
            if (forceClose || !isHidden) {
                dropdown.classList.add('hidden');
                if (heading) heading.style.display = ''; // Show the heading
            } else {
                dropdown.classList.remove('hidden');
                if (heading) heading.style.display = 'none'; // Hide the heading
            }
        };



        // Helper function to switch between line and arrow
        const toggleMenuIcon = (parentItem, wrapper) => {
            const iconArrow = parentItem.querySelector(".menu-icon-arrow");
            const iconLine = parentItem.querySelector(".menu-icon-line");

            if (iconArrow) {
                iconArrow.remove();
                const newIconLine = document.createElement('div');
                newIconLine.classList.add('menu-icon-line');
                wrapper.prepend(newIconLine);
            } else if (iconLine) {
                iconLine.remove();
                const newIconArrow = document.createElement('div');
                newIconArrow.classList.add('menu-icon-arrow');
                wrapper.prepend(newIconArrow);
            }
        };

        const togglePropertyIcon = (iconDiv, parentWrapper) => {
            if (iconDiv.classList.contains('product-desc-icon-line')) {
                // Remove line icon and add arrow icon
                iconDiv.remove();
                const arrowIcon = document.createElement('div');
                arrowIcon.classList.add('product-desc-icon-arrow');
                parentWrapper.appendChild(arrowIcon);
            } else if (iconDiv.classList.contains('product-desc-icon-arrow')) {
                // Remove arrow icon and add line icon
                iconDiv.remove();
                const lineIcon = document.createElement('div');
                lineIcon.classList.add('product-desc-icon-line');
                parentWrapper.appendChild(lineIcon);
            }
        };




        // Remove existing listeners
        document.querySelectorAll('.product--dynamic-heading').forEach((heading) => {
            const clonedHeading = heading.cloneNode(true);
            heading.parentNode.replaceChild(clonedHeading, heading);
        });

        // Handle top-level menu items
        const menuItems = document.querySelectorAll(".main-menu--item > .flex-wrapper");
        menuItems.forEach(wrapper => {
            wrapper.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent event from bubbling up

                // Close all product descriptions when a main menu item is clicked
                closeAllProductDescriptions();

                const parentItem = wrapper.closest(".main-menu--item");
                toggleMenuIcon(parentItem, wrapper);

                // Toggle visibility of the dropdown
                const dropdown = parentItem.querySelector(".dropdown");
                if (dropdown) {
                    dropdown.classList.toggle("hidden");
                }
            });
        });

        // Handle product dropdowns
        document.addEventListener('productListRendered', () => {
            console.log("Product list rendered. Adding event listeners...");

            //let lastOpenedProduct = null; // Track the last opened product

            const productHeadings = document.querySelectorAll('.product--dynamic-heading');
            productHeadings.forEach((heading) => {
                heading.addEventListener('click', (event) => {
                    console.log("Product heading clicked:", heading);
                    event.stopPropagation();

                    const product = heading.closest('.product');
                    const productDropdown = product.querySelector('.product-dropdown');

                    // Prevent dropdown from closing during scroll or touch interactions
                    /*
                    if (productDropdown) {
                        productDropdown.addEventListener('touchstart', (e) => {
                            e.stopPropagation();
                        });
                        productDropdown.addEventListener('mousedown', (e) => {
                            e.stopPropagation();
                        });
                    } */

                    if (!productDropdown.dataset.listenerAdded) {
                        productDropdown.dataset.listenerAdded = true;
                        productDropdown.addEventListener('touchstart', (e) => e.stopPropagation());
                        productDropdown.addEventListener('mousedown', (e) => e.stopPropagation());
                    }

                    // Check if another product description is already open
                    if (lastOpenedProduct && lastOpenedProduct !== product) {
                        const lastDropdown = lastOpenedProduct.querySelector('.product-dropdown');
                        const lastHeading = lastOpenedProduct.querySelector('.product--dynamic-heading');
                        //lastProductDropdown.classList.add('hidden');
                        toggleDropdown(lastDropdown, lastHeading, true);
                        //lastHeading.style.display = ''; // Show the dynamic heading
                    }
                    // Toggle visibility of the current product description
                    toggleDropdown(productDropdown, heading);
                    lastOpenedProduct = product;
                });
            });


            // Add event listener to property headers
            const propertyHeaders = document.querySelectorAll('.property-header');
            propertyHeaders.forEach((header) => {
                // Handle click on the property header
                header.addEventListener('click', (event) => {
                    const propertyLi = header.closest('li');
                    const propertyContentUl = propertyLi.querySelector('ul');
                    const iconDiv = header.closest('.flex-wrapper').querySelector('.product-desc-icon-line, .product-desc-icon-arrow');

                    // Toggle visibility of the child <ul>
                    if (propertyContentUl) {
                        propertyContentUl.classList.toggle('hidden');
                    }



                    // Toggle between the two icons (line and arrow)
                    if (iconDiv) {
                        if (iconDiv.classList.contains('product-desc-icon-line')) {
                            togglePropertyIcon(iconDiv, header.closest('.flex-wrapper'));
                        } else {
                            // Remove arrow icon and add line icon
                            iconDiv.classList.remove('product-desc-icon-arrow');
                            const lineIcon = document.createElement('div');
                            lineIcon.classList.add('product-desc-icon-line');
                            header.closest('.flex-wrapper').appendChild(lineIcon);
                        }
                    }
                });

                // Handle click on the icon itself (line or arrow)
                const iconDiv = header.closest('.flex-wrapper').querySelector('.product-desc-icon-line, .product-desc-icon-arrow');
                if (iconDiv) {
                    iconDiv.addEventListener('click', (event) => {
                        event.stopPropagation(); // Prevent the event from bubbling up

                        const propertyLi = header.closest('li');
                        const propertyContentUl = propertyLi.querySelector('ul');

                        // Toggle visibility of the child <ul>
                        if (propertyContentUl) {
                            propertyContentUl.classList.toggle('hidden');
                        }

                        // Toggle between the two icons using togglePropertyIcon
                        togglePropertyIcon(iconDiv, header.closest('.flex-wrapper'));
                    });
                }

            });

            // Add event listener for the product description header to toggle visibility
            const productDescriptionHeaders = document.querySelectorAll('.product-description-header');
            productDescriptionHeaders.forEach(header => {
                header.addEventListener('click', (event) => {
                    const product = header.closest('.product');
                    const productDropdown = product.querySelector('.product-dropdown');
                    const productDynamicHeading = product.querySelector('.product--dynamic-heading');

                    // toggleDropdown helper function for consistency
                    toggleDropdown(productDropdown, productDynamicHeading);
                });
            });

        });

        // Function to close all product descriptions
        function closeAllProductDescriptions() {
            const allProductDropdowns = document.querySelectorAll('.product-dropdown');
            const allProductHeadings = document.querySelectorAll('.product--dynamic-heading');

            allProductDropdowns.forEach(dropdown => {
                dropdown.classList.add('hidden');
            });

            allProductHeadings.forEach(heading => {
                heading.style.display = ''; // Ensure the dynamic heading is visible
            });
        }
    };

    // Load scripts only for mobile devices (less than 900px width)
    if (window.innerWidth < 900) {
        runMobileScripts();
    } else {
        console.log("Script not loaded: screen width >= 900px");
    }

    // Handle resizing to trigger script on mobile size
    window.addEventListener('resize', () => {
        if (window.innerWidth < 900) {
            runMobileScripts();
        }
    });
}); 