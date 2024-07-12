document.addEventListener('DOMContentLoaded', function () {
    console.log('Fetching data.json...');
    fetch('/data.json')
        .then(response => {
            console.log('Response:', response);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data:', data);
            renderProducts(data);

            // Add resize event listener
            window.addEventListener('resize', () => {
                renderProducts(data);
            });
        })
        .catch(error => console.error('Error fetching the product data:', error));




    function renderProducts(products) {
        const productListMobile = document.getElementById('products-mobile');
        const productInfoDesktopSection = document.getElementById('product-info-desktop');
        const productsDesktopAside = document.getElementById('products-desktop-aside');
        const mapSection = document.getElementById('map-section')




        if (!productListMobile || !productsDesktopAside || !productInfoDesktopSection) {
            console.error('Element with id "products-mobile" or "products-desktop" not found.');
            return;
        }

        productListMobile.innerHTML = '';
        productsDesktopAside.innerHTML = '';

        productInfoDesktopSection.classList.add('hidden');
        mapSection.classList.remove('hidden');

        for (const productId in products) {

            const product = products[productId];

            if (window.innerWidth > 900) {

                /* list item for desktop menu */
                const desktopMenuLi = document.createElement('li');
                desktopMenuLi.classList.add('desktop-product-item', 'flex-row');
                const productName = document.createElement('div');
                productName.textContent = product.name + " ";
                const productPrice = document.createElement('div');
                productPrice.textContent = " от " + product.price;
                productPrice.classList.add("desktop-li-price")
                const productUnits = document.createElement('div');
                productUnits.textContent = product.units;
                productUnits.classList.add("desktop-li-units")
                desktopMenuLi.appendChild(productName);
                desktopMenuLi.appendChild(productPrice);
                desktopMenuLi.appendChild(productUnits);

                //on click of the menu items, producr description is shown
                desktopMenuLi.addEventListener('click', () => {

                    productInfoDesktopSection.innerHTML = '';
                    productInfoDesktopSection.classList.remove('hidden');

                    const productInfo = document.createElement('div');
                    productInfo.classList.add('d-product-info');

                    const wrapper = document.createElement('div');
                    wrapper.classList.add('d-flex-wrapper', 'border-bottom');

                    const productInfoHeading = document.createElement('h2');
                    productInfoHeading.textContent = product.name;

                    const iconDiv = document.createElement('div');
                    iconDiv.classList.add('product-desc-icon-line');
                    wrapper.appendChild(productInfoHeading);
                    wrapper.appendChild(iconDiv)

                    productInfo.appendChild(wrapper);

                    const productDescription = document.createElement('p');
                    productDescription.textContent = product.properties["Описание"];
                    productInfo.appendChild(productDescription);
                    //productInfoDesktop.style.display = 'grid';

                    productInfoDesktopSection.appendChild(productInfo);


                    const gridWrapper = document.createElement("div");
                    gridWrapper.classList.add('description-grid-wrapper');

                    const imgDesktop = document.createElement('img');
                    imgDesktop.src = product.productImage;

                    const dDescriptionUl = document.createElement('ul');

                    gridWrapper.appendChild(imgDesktop);
                    gridWrapper.appendChild(dDescriptionUl);

                    productInfoDesktopSection.appendChild(gridWrapper);


                });

                productsDesktopAside.appendChild(desktopMenuLi);


            } else {


                const productLi = document.createElement('li');
                productLi.classList.add('product');


                //Add dynamic heading with background image
                const dynamicHeading = document.createElement('div');
                dynamicHeading.classList.add('product--dynamic-heading');


                const arrowDiv = document.createElement('div');
                arrowDiv.classList.add('product-menu-arrow');
                dynamicHeading.appendChild(arrowDiv);

                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.style.backgroundImage = product.headingBackground;

                const productNameDiv = document.createElement('div');
                productNameDiv.classList.add('product-name');
                productNameDiv.textContent = product["name"];
                productDiv.appendChild(productNameDiv);

                const productPriceDiv = document.createElement('div');
                productPriceDiv.classList.add('product-price');
                productPriceDiv.textContent = `${product["price"]} ${product["units"]}`
                productDiv.appendChild(productPriceDiv);


                dynamicHeading.appendChild(productDiv);

                //end adding Dynamic heading

                //add dropdown with description (ul)
                const descriptionUl = document.createElement('ul');
                descriptionUl.classList.add("dropdown", "product-dropdown");
                descriptionUl.style.display = "block";

                const descriptionLi = document.createElement('li');
                descriptionLi.classList.add('product-description');

                const productDescriptionHeader = document.createElement('div');
                productDescriptionHeader.classList.add('product-description-header');

                const icon = document.createElement('div');
                icon.classList.add('product-desc-icon-line');

                const productDescriptionh3 = document.createElement('h3');
                productDescriptionh3.innerText = product.name;

                const img = document.createElement('img');
                img.src = product.productImage;

                productDescriptionHeader.appendChild(icon);
                productDescriptionHeader.appendChild(productDescriptionh3);
                descriptionLi.appendChild(productDescriptionHeader);
                descriptionUl.appendChild(descriptionLi);
                descriptionUl.appendChild(img);



                //end of description (ul)

                // Create ul for properties with yellow headings
                const propertiesUl = document.createElement('ul');
                propertiesUl.classList.add('product-list');

                const properties = product.properties;
                console.log('Properties:', properties);

                for (const key in properties) {
                    if (properties.hasOwnProperty(key)) {
                        const propertyLi = document.createElement('li');
                        propertyLi.classList.add('product-list-dropdown-item');
                        const propertyHeader = document.createElement('div');
                        const icon = document.createElement('div');
                        icon.classList.add('product-desc-icon-line');
                        const helperDiv = document.createElement('div');
                        helperDiv.classList.add('flex-wrapper', 'bordered-wrapper');
                        helperDiv.appendChild(propertyHeader)
                        helperDiv.appendChild(icon);
                        propertyHeader.classList.add('property-header');
                        propertyHeader.textContent = key;

                        propertyLi.appendChild(helperDiv);

                        const propertyContentUl = document.createElement('ul');
                        propertyContentUl.classList.add('product-inner-dropdown', 'visible');

                        if (typeof properties[key] === 'object' && !Array.isArray(properties[key])) {
                            for (const subKey in properties[key]) {
                                if (properties[key].hasOwnProperty(subKey)) {
                                    const subPropertyLi = document.createElement('li');
                                    const div1 = document.createElement('div');
                                    const div2 = document.createElement('div');
                                    subPropertyLi.classList.add('product-inner-dropdown--item')
                                    div1.textContent = `${subKey}`;
                                    div2.textContent = `${properties[key][subKey]}`;
                                    subPropertyLi.appendChild(div1);
                                    subPropertyLi.appendChild(div2);
                                    propertyContentUl.appendChild(subPropertyLi);
                                }
                            }
                        } else if (Array.isArray(properties[key])) {
                            properties[key].forEach(item => {
                                const arrayItemLi = document.createElement('li');
                                arrayItemLi.classList('test');
                                arrayItemLi.textContent = item;
                                propertyContentUl.appendChild(arrayItemLi);
                            });
                        } else {
                            const simplePropertyLi = document.createElement('li');
                            const div = document.createElement('div')
                            div.textContent = properties[key];
                            simplePropertyLi.appendChild(div);
                            simplePropertyLi.classList.add('product-inner-dropdown--item', 'description');
                            propertyContentUl.appendChild(simplePropertyLi);
                        }

                        propertyLi.appendChild(propertyContentUl);
                        propertiesUl.appendChild(propertyLi);
                    }
                }

                descriptionUl.appendChild(propertiesUl);

                const button = document.createElement('button');
                button.classList.add('product-button');
                button.textContent = "В заказ";
                const priceDiv = document.createElement('div');
                priceDiv.innerText = `от ${product["price"]} ${product["units"]}`
                const wrapper = document.createElement('div');
                wrapper.classList.add('product-wrapper');
                wrapper.appendChild(button);
                wrapper.appendChild(priceDiv);




                //end of ul of properties
                descriptionUl.appendChild(propertiesUl);
                descriptionUl.appendChild(wrapper);


                productLi.appendChild(dynamicHeading);
                productLi.appendChild(descriptionUl);


                //productListMobile.appendChild(productLi);




                productListMobile.appendChild(productLi);

            }

        }
    }
});