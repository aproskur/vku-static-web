document.addEventListener('DOMContentLoaded', () => {
    const runMobileScripts = () => {
        console.log("Script loaded for mobile");

        let isScrolling = false;  // Flag to track scrolling state

        // Handle top-level menu items
        const menuItems = document.querySelectorAll(".main-menu--item > .flex-wrapper");
        menuItems.forEach(wrapper => {
            wrapper.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent event from bubbling up
                closeAllProductDescriptions();

                const parentItem = wrapper.closest(".main-menu--item");
                const iconArrow = parentItem.querySelector(".menu-icon-arrow");
                const iconLine = parentItem.querySelector(".menu-icon-line");

                // Toggle between arrow and line
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

            let lastOpenedProduct = null;

            const productHeadings = document.querySelectorAll('.product--dynamic-heading');
            productHeadings.forEach((heading) => {
                heading.addEventListener('click', (event) => {
                    event.stopPropagation();

                    const product = heading.closest('.product');
                    const productDropdown = product.querySelector('.product-dropdown');

                    // Prevent dropdown from closing during touch or scroll interactions
                    if (productDropdown) {
                        productDropdown.addEventListener('touchstart', (e) => {
                            e.stopPropagation();
                        });
                        productDropdown.addEventListener('mousedown', (e) => {
                            e.stopPropagation();
                        });
                    }

                    // Only toggle the dropdown if it's not being scrolled or interacted with
                    if (!isScrolling) {
                        // Handle last opened product visibility
                        if (lastOpenedProduct && lastOpenedProduct !== product) {
                            const lastProductDropdown = lastOpenedProduct.querySelector('.product-dropdown');
                            const lastProductHeading = lastOpenedProduct.querySelector('.product--dynamic-heading');
                            lastProductDropdown.classList.add('hidden');
                            lastProductHeading.style.display = ''; // Show the dynamic heading
                        }

                        // Toggle visibility of the current product description
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
                    }
                });
            });

            // Prevent unexpected closures while scrolling
            window.addEventListener('scroll', () => {
                isScrolling = true;
                setTimeout(() => {
                    isScrolling = false;
                }, 300); // Reset scroll flag after 300ms of inactivity
            });

            // Additional handling for property headers
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
            });

            // Handle the product description header toggle
            const productDescriptionHeaders = document.querySelectorAll('.product-description-header');
            productDescriptionHeaders.forEach(header => {
                header.addEventListener('click', (event) => {
                    const product = header.closest('.product');
                    const productDropdown = product.querySelector('.product-dropdown');
                    const productDynamicHeading = product.querySelector('.product--dynamic-heading');

                    if (productDropdown && !productDropdown.classList.contains('hidden')) {
                        productDropdown.classList.add('hidden');
                        productDynamicHeading.style.display = ''; // Show dynamic heading
                    } else {
                        productDropdown.classList.remove('hidden');
                        productDynamicHeading.style.display = 'none'; // Hide dynamic heading
                    }
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
