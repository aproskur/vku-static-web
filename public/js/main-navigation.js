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
                iconDiv.remove();
                const arrowIcon = document.createElement('div');
                arrowIcon.classList.add('product-desc-icon-arrow');
                parentWrapper.appendChild(arrowIcon);
            } else if (iconDiv.classList.contains('product-desc-icon-arrow')) {
                iconDiv.remove();
                const lineIcon = document.createElement('div');
                lineIcon.classList.add('product-desc-icon-line');
                parentWrapper.appendChild(lineIcon);
            }
        };

        // Function to attach event listeners for products
        const attachProductListeners = () => {
            const productHeadings = document.querySelectorAll('.product--dynamic-heading');
            productHeadings.forEach((heading) => {
                heading.addEventListener('click', (event) => {
                    event.stopPropagation();

                    const product = heading.closest('.product');
                    const productDropdown = product.querySelector('.product-dropdown');

                    if (!productDropdown.dataset.listenerAdded) {
                        productDropdown.dataset.listenerAdded = true;
                        productDropdown.addEventListener('touchstart', (e) => e.stopPropagation());
                        productDropdown.addEventListener('mousedown', (e) => e.stopPropagation());
                    }

                    // Close previously opened product
                    if (lastOpenedProduct && lastOpenedProduct !== product) {
                        const lastDropdown = lastOpenedProduct.querySelector('.product-dropdown');
                        const lastHeading = lastOpenedProduct.querySelector('.product--dynamic-heading');
                        toggleDropdown(lastDropdown, lastHeading, true);
                    }

                    // Toggle current product
                    toggleDropdown(productDropdown, heading);
                    lastOpenedProduct = product;
                });
            });
        };

        // Function to close all product descriptions
        const closeAllProductDescriptions = () => {
            const allProductDropdowns = document.querySelectorAll('.product-dropdown');
            const allProductHeadings = document.querySelectorAll('.product--dynamic-heading');

            allProductDropdowns.forEach((dropdown) => dropdown.classList.add('hidden'));
            allProductHeadings.forEach((heading) => (heading.style.display = ''));
        };

        // Add listeners for menu items
        const menuItems = document.querySelectorAll(".main-menu--item > .flex-wrapper");
        menuItems.forEach((wrapper) => {
            wrapper.addEventListener('click', (event) => {
                event.stopPropagation();
                closeAllProductDescriptions();

                const parentItem = wrapper.closest(".main-menu--item");
                toggleMenuIcon(parentItem, wrapper);

                const dropdown = parentItem.querySelector(".dropdown");
                if (dropdown) {
                    dropdown.classList.toggle("hidden");
                }
            });
        });

        // Event listener for product list rendering
        document.addEventListener('productListRendered', () => {
            console.log("Product list rendered. Adding event listeners...");
            attachProductListeners();
        });

        // Attach listeners for property headers
        const propertyHeaders = document.querySelectorAll('.property-header');
        propertyHeaders.forEach((header) => {
            header.addEventListener('click', (event) => {
                const propertyLi = header.closest('li');
                const propertyContentUl = propertyLi.querySelector('ul');
                const iconDiv = header.closest('.flex-wrapper').querySelector('.product-desc-icon-line, .product-desc-icon-arrow');

                if (propertyContentUl) {
                    propertyContentUl.classList.toggle('hidden');
                }

                if (iconDiv) {
                    togglePropertyIcon(iconDiv, header.closest('.flex-wrapper'));
                }
            });
        });

        // Debounce scroll event
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // No unnecessary collapsing during scroll
                console.log('Scroll event processed.');
            }, 200);
        });
    };

    // Run scripts only on mobile
    if (window.innerWidth < 900) {
        runMobileScripts();
    } else {
        console.log("Script not loaded: screen width >= 900px");
    }

    // Debounced resize handler to trigger mobile scripts
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth < 900) {
                runMobileScripts();
            }
        }, 300);
    });
});
