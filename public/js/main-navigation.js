document.addEventListener('DOMContentLoaded', () => {
    const runMobileScripts = () => {
        console.log("Script loaded for mobile");

        // Function to toggle the menu icon
        const toggleIcon = (wrapper) => {
            const parentItem = wrapper.closest(".main-menu--item");
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

        // Handle top-level menu items
        const menuItems = document.querySelectorAll(".main-menu--item > .flex-wrapper");
        menuItems.forEach(wrapper => {
            wrapper.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent event from bubbling up

                // Close all product descriptions when a main menu item is clicked
                closeAllProductDescriptions();

                // Toggle the icon (arrow/line)
                toggleIcon(wrapper);

                // Toggle visibility of the dropdown
                const parentItem = wrapper.closest(".main-menu--item");
                const dropdown = parentItem.querySelector(".dropdown");
                if (dropdown) {
                    dropdown.classList.toggle("hidden");
                }
            });
        });

        // Handle product dropdowns
        document.addEventListener('productListRendered', () => {
            console.log("Product list rendered. Adding event listeners...");

            let lastOpenedProduct = null;

            const productHeadings = document.querySelectorAll('.product--dynamic-heading');
            productHeadings.forEach((heading) => {
                heading.addEventListener('click', (event) => {
                    event.stopPropagation();

                    const product = heading.closest('.product');
                    const productDropdown = product.querySelector('.product-dropdown');

                    // Prevent dropdown from closing during scroll or touch interactions
                    if (productDropdown) {
                        productDropdown.addEventListener('touchstart', (e) => {
                            e.stopPropagation();
                        }, { passive: true });

                        productDropdown.addEventListener('mousedown', (e) => e.stopPropagation());
                    }

                    if (lastOpenedProduct && lastOpenedProduct !== product) {
                        const lastProductDropdown = lastOpenedProduct.querySelector('.product-dropdown');
                        const lastProductHeading = lastOpenedProduct.querySelector('.product--dynamic-heading');
                        lastProductDropdown.classList.add('hidden');
                        lastProductHeading.style.display = ''; // Show the dynamic heading
                    }

                    if (productDropdown) {
                        const isHidden = productDropdown.classList.contains('hidden');
                        productDropdown.classList.toggle('hidden');
                        heading.style.display = isHidden ? 'none' : '';
                    }

                    product.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });

                    lastOpenedProduct = product;
                });
            });

            // Add event listener to property headers
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
                        if (iconDiv.classList.contains('product-desc-icon-line')) {
                            iconDiv.classList.remove('product-desc-icon-line');
                            const arrowIcon = document.createElement('div');
                            arrowIcon.classList.add('product-desc-icon-arrow');
                            header.closest('.flex-wrapper').appendChild(arrowIcon);
                        } else {
                            iconDiv.classList.remove('product-desc-icon-arrow');
                            const lineIcon = document.createElement('div');
                            lineIcon.classList.add('product-desc-icon-line');
                            header.closest('.flex-wrapper').appendChild(lineIcon);
                        }
                    }
                });

                const iconDiv = header.closest('.flex-wrapper').querySelector('.product-desc-icon-line, .product-desc-icon-arrow');
                if (iconDiv) {
                    iconDiv.addEventListener('click', (event) => {
                        event.stopPropagation();
                        const propertyLi = header.closest('li');
                        const propertyContentUl = propertyLi.querySelector('ul');

                        if (propertyContentUl) {
                            propertyContentUl.classList.toggle('hidden');
                        }

                        if (iconDiv.classList.contains('product-desc-icon-line')) {
                            iconDiv.classList.remove('product-desc-icon-line');
                            const arrowIcon = document.createElement('div');
                            arrowIcon.classList.add('product-desc-icon-arrow');
                            header.closest('.flex-wrapper').appendChild(arrowIcon);
                        } else {
                            iconDiv.classList.remove('product-desc-icon-arrow');
                            const lineIcon = document.createElement('div');
                            lineIcon.classList.add('product-desc-icon-line');
                            header.closest('.flex-wrapper').appendChild(lineIcon);
                        }
                    });
                }
            });
        });

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

    window.addEventListener('resize', () => {
        if (window.innerWidth < 900) {
            runMobileScripts();
        }
    });
});
