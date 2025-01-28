document.addEventListener('DOMContentLoaded', () => {
    const runMobileScripts = () => {
        console.log("Script loaded for mobile");

        let lastOpenedProduct = null; // Keeps track of the last opened product dropdown.

        /**
         * Toggles visibility of a dropdown element.
         * @param {HTMLElement} dropdown - The dropdown to toggle.
         * @param {Boolean} forceClose - Whether to forcibly close the dropdown.
         */
        const toggleDropdown = (dropdown, forceClose = false) => {
            if (!dropdown) return;

            if (forceClose || !dropdown.classList.contains('hidden')) {
                dropdown.classList.add('hidden');
            } else {
                dropdown.classList.remove('hidden');
            }
        };

        /**
         * Closes all product dropdowns and resets their states.
         */
        const closeAllProductDropdowns = () => {
            document.querySelectorAll('.product-dropdown').forEach((dropdown) => {
                dropdown.classList.add('hidden');
            });
        };

        /**
         * Handles clicks on product headings to toggle dropdowns.
         * @param {Event} event - The click event.
         */
        const handleProductClick = (event) => {
            const heading = event.target.closest('.product--dynamic-heading');
            if (!heading) return;

            const product = heading.closest('.product');
            const productDropdown = product.querySelector('.product-dropdown');

            // Close the last opened product if it's not the current one.
            if (lastOpenedProduct && lastOpenedProduct !== product) {
                const lastDropdown = lastOpenedProduct.querySelector('.product-dropdown');
                toggleDropdown(lastDropdown, true);
            }

            // Toggle the current product's dropdown.
            toggleDropdown(productDropdown);
            lastOpenedProduct = product;
        };

        /**
         * Handles clicks on `product-list-dropdown-item` inside product dropdowns.
         * Prevents closing the outer dropdown when interacting with these items.
         * @param {Event} event - The click event.
         */
        const handleInnerListClick = (event) => {
            const innerItem = event.target.closest('.product-list-dropdown-item');
            if (innerItem) {
                event.stopPropagation(); // Prevent the click from bubbling to outer dropdown logic.
                console.log(`Clicked inner list item: ${innerItem.textContent}`);
                // Perform any additional logic here (e.g., navigating, toggling, etc.).
            }
        };

        /**
         * Handles clicks on property headers to toggle their respective dropdowns.
         * @param {Event} event - The click event.
         */
        const handleInnerDropdownClick = (event) => {
            const header = event.target.closest('.property-header');
            if (!header) return;

            const propertyLi = header.closest('li');
            const innerDropdown = propertyLi.querySelector('ul');

            if (innerDropdown) {
                innerDropdown.classList.toggle('hidden');
            }
        };

        /**
         * Attaches all necessary listeners to the product container.
         * Uses event delegation for dynamic elements.
         */
        const attachProductListeners = () => {
            const productContainer = document.querySelector('#products-mobile');
            if (!productContainer) return;

            // Delegate clicks for product headings.
            productContainer.addEventListener('click', handleProductClick);

            // Delegate clicks for inner dropdown items.
            productContainer.addEventListener('click', handleInnerListClick);

            // Delegate clicks for property headers.
            productContainer.addEventListener('click', handleInnerDropdownClick);
        };

        /**
         * Handles clicks on main menu items to toggle their dropdowns.
         */
        const attachMainMenuListeners = () => {
            const mainMenu = document.querySelector('.main-menu');
            if (!mainMenu) return;

            mainMenu.addEventListener('click', (event) => {
                const wrapper = event.target.closest('.flex-wrapper');
                if (!wrapper) return;

                const parentItem = wrapper.closest('.main-menu--item');
                const dropdown = parentItem.querySelector('.dropdown');

                // Close all product dropdowns when interacting with the main menu.
                closeAllProductDropdowns();

                // Toggle the main menu dropdown visibility.
                if (dropdown) {
                    dropdown.classList.toggle('hidden');
                }
            });
        };

        /**
         * Resets dropdowns when resizing back to desktop view.
         */
        const handleResize = () => {
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    if (window.innerWidth >= 900) {
                        console.log("Desktop view detected. Closing all dropdowns.");
                        closeAllProductDropdowns();
                    }
                }, 300);
            });
        };

        // Attach necessary listeners.
        attachMainMenuListeners();
        attachProductListeners();
        handleResize();

        // Listen for dynamic product rendering.
        document.addEventListener('productListRendered', () => {
            console.log("Product list rendered. Reattaching product listeners...");
            attachProductListeners();
        });
    };

    // Run mobile scripts only if the screen width is less than 900px.
    if (window.innerWidth < 900) {
        runMobileScripts();
    } else {
        console.log("Script not loaded: screen width >= 900px");
    }
});
