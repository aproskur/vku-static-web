document.addEventListener('DOMContentLoaded', () => {
    const runMobileScripts = () => {
        console.log("Script loaded for mobile");

        let lastOpenedProduct = null;

        /**
         * Toggles the dropdown visibility and updates the arrow/line icons.
         * @param {HTMLElement} dropdown - The dropdown to toggle.
         * @param {HTMLElement} heading - The heading containing the toggle icons.
         * @param {Boolean} forceClose - Whether to forcibly close the dropdown.
         */
        const toggleDropdown = (dropdown, heading, forceClose = false) => {
            if (!dropdown) return;

            const isHidden = dropdown.classList.contains('hidden');
            if (forceClose || !isHidden) {
                dropdown.classList.add('hidden');
                if (heading) heading.style.display = ''; // Reset heading visibility
            } else {
                dropdown.classList.remove('hidden');
                if (heading) heading.style.display = 'none'; // Hide heading
            }
        };

        /**
         * Toggles between line and arrow icons for menu items.
         * @param {HTMLElement} parentItem - The parent menu item containing icons.
         * @param {HTMLElement} wrapper - The wrapper where icons are toggled.
         */
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

        /**
         * Closes all product descriptions and resets icons.
         */
        const closeAllProductDescriptions = () => {
            const allProductDropdowns = document.querySelectorAll('.product-dropdown');
            const allProductHeadings = document.querySelectorAll('.product--dynamic-heading');

            allProductDropdowns.forEach((dropdown) => dropdown.classList.add('hidden'));
            allProductHeadings.forEach((heading) => (heading.style.display = ''));
        };

        /**
         * Prevents dropdown collapse on scroll.
         * Keeps track of dynamic and static dropdown states.
         */
        const preventScrollCollapse = () => {
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    console.log('Scroll detected, but dropdowns remain open.');
                    // No collapsing occurs during scroll
                }, 200);
            });
        };

        /**
         * Handles clicks on product headings to toggle dropdowns and icons.
         */
        const attachProductListeners = () => {
            const productHeadings = document.querySelectorAll('.product--dynamic-heading');
            productHeadings.forEach((heading) => {
                heading.addEventListener('click', (event) => {
                    event.stopPropagation();

                    const product = heading.closest('.product');
                    const productDropdown = product.querySelector('.product-dropdown');

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

        /**
         * Ensures dynamically rendered dropdowns behave consistently.
         */
        const handleDynamicDropdowns = () => {
            document.addEventListener('productListRendered', () => {
                console.log("Dynamic product list rendered. Reattaching listeners...");
                attachProductListeners();
            });
        };

        /**
         * Adds event listeners for the main menu items.
         */
        const attachMainMenuListeners = () => {
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
        };

        // Attach listeners for menu items, products, and prevent scroll collapse
        attachMainMenuListeners();
        attachProductListeners();
        preventScrollCollapse();
        handleDynamicDropdowns();
    };

    // Run scripts only if screen width is less than 900px
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
