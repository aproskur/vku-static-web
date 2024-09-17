// I added separate function for description to avoid too much code in one function. For easier fixes. aTODO make the other parts more modular
function createDescriptionDiv(properties) {
    const dDescriptionDiv = document.createElement('div');
    dDescriptionDiv.classList.add('d-product-full-info');

    // Iterate over each field in properties
    for (const key in properties) {
        if (properties.hasOwnProperty(key) && key !== "Описание") { // Exclude "Описание"
            // Create an h3 element for each field
            const propertyHeader = document.createElement('h3');
            propertyHeader.textContent = key;

            // Create a ul element for the list of items
            const propertyListUl = document.createElement('ul');

            // Check the type of the value
            const propertyValue = properties[key];
            if (typeof propertyValue === 'object' && !Array.isArray(propertyValue)) {
                // If it's an object, iterate through its keys
                for (const subKey in propertyValue) {
                    if (propertyValue.hasOwnProperty(subKey)) {
                        const itemLi = document.createElement('li');

                        // Create divs for the key and value
                        const keyDiv = document.createElement('div');
                        keyDiv.classList.add('property-key'); // Add a class for styling
                        keyDiv.textContent = subKey;

                        const valueDiv = document.createElement('div');
                        valueDiv.classList.add('property-value'); // Add a class for styling
                        valueDiv.textContent = propertyValue[subKey];

                        // Append the key and value divs to the li
                        itemLi.appendChild(keyDiv);
                        itemLi.appendChild(valueDiv);
                        propertyListUl.appendChild(itemLi);
                    }
                }
            } else if (Array.isArray(propertyValue)) {
                // If it's an array, add each item to the list
                propertyValue.forEach(item => {
                    const itemLi = document.createElement('li');

                    // Since this is an array item, we only have a value
                    const valueDiv = document.createElement('div');
                    valueDiv.classList.add('property-value'); // Add a class for styling
                    valueDiv.textContent = item;

                    itemLi.appendChild(valueDiv);
                    propertyListUl.appendChild(itemLi);
                });
            } else {
                // If it's a simple value, add it directly
                const itemLi = document.createElement('li');

                // Create divs for the key and value
                const keyDiv = document.createElement('div');
                keyDiv.classList.add('property-key'); // Add a class for styling
                keyDiv.textContent = key; // This is for the header

                const valueDiv = document.createElement('div');
                valueDiv.classList.add('property-value'); // Add a class for styling
                valueDiv.textContent = propertyValue;

                // Append the key and value divs to the li
                itemLi.appendChild(keyDiv);
                itemLi.appendChild(valueDiv);
                propertyListUl.appendChild(itemLi);
            }

            // Append the h3 and ul to the description div
            dDescriptionDiv.appendChild(propertyHeader);
            dDescriptionDiv.appendChild(propertyListUl);
        }
    }

    return dDescriptionDiv;
}



//Function for adding buttons with cart and chat on the desctop (3rd row)
function createButtonSection() {
    const buttonSection = document.createElement('div');
    buttonSection.classList.add('d-product-controls');

    const firstSvgContainer = document.createElement('div');
    firstSvgContainer.classList.add('svg-container');
    // Add SVG content here for the first button
    firstSvgContainer.innerHTML = `
                 <svg width="89" height="83" viewBox="0 0 89 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1395_12546)">
                            <path
                                d="M21.6829 0H75.6829C76.9671 0 78.1769 0.237221 79.3073 0.709809C80.4428 1.18457 81.4676 1.88157 82.3759 2.79843L86.2274 6.68607C87.1356 7.60304 87.8264 8.63728 88.2968 9.78378C88.765 10.9245 89 12.1456 89 13.4419V61.1045C89 62.4008 88.7647 63.622 88.2966 64.7626C87.8263 65.9091 87.1356 66.9435 86.2274 67.8601L74.0009 80.2014C73.0928 81.1181 72.068 81.8153 70.9322 82.29C69.8021 82.7626 68.5923 83 67.3081 83H13.317C12.0329 83 10.8231 82.7628 9.69301 82.2902C8.55716 81.8154 7.53253 81.1181 6.62409 80.2014L2.77252 76.3137C1.88841 75.4213 1.2318 74.3316 0.779637 73.2302C0.247043 71.9323 0 70.6022 0 69.5581V21.894C0 20.5982 0.235122 19.3775 0.702827 18.2369C1.16965 17.0989 1.85988 16.0669 2.77085 15.1469L14.9884 2.80702C15.9075 1.87891 16.9301 1.17905 18.0509 0.71031C19.1812 0.237426 20.3936 0 21.6829 0ZM75.6829 3.5198H21.6829C20.8449 3.5198 20.078 3.66529 19.3856 3.9549C18.6835 4.24855 18.0384 4.69144 17.4537 5.28181L5.23622 17.6217C4.64509 18.2186 4.20475 18.8695 3.91735 19.5704C3.63102 20.2686 3.48697 21.0442 3.48697 21.894V69.5581C3.48697 70.208 3.64783 71.0527 3.99416 71.8967C4.27775 72.5882 4.68819 73.2703 5.23789 73.8252L9.08947 77.7129C9.6848 78.3137 10.3275 78.7585 11.014 79.0456C11.7059 79.3349 12.4749 79.4802 13.317 79.4802H67.3081C68.1502 79.4802 68.9192 79.3347 69.6111 79.0454C70.2978 78.7583 70.9404 78.3137 71.5355 77.7129L83.762 65.3716C84.3573 64.7709 84.7979 64.122 85.0822 63.4291C85.3688 62.7306 85.5129 61.9545 85.5129 61.1045V13.4419C85.5129 12.5919 85.369 11.8157 85.0824 11.1173C84.798 10.4243 84.3573 9.7755 83.762 9.17458L79.9105 5.28693C79.3152 4.68601 78.6726 4.24134 77.9863 3.9544C77.2942 3.66508 76.5252 3.5198 75.6829 3.5198Z"
                                fill="white" />
                            <path
                                d="M30.25 15.0613C29.9185 15.0613 29.6005 15.1946 29.3661 15.4319C29.1317 15.6692 29 15.991 29 16.3266C29 16.6621 29.1317 16.984 29.3661 17.2213C29.6005 17.4586 29.9185 17.5919 30.25 17.5919H30.865C31.1364 17.5923 31.4003 17.6822 31.6168 17.848C31.8333 18.0137 31.9906 18.2462 32.065 18.5105L36.03 32.5552C36.2543 33.3478 36.7274 34.0449 37.3778 34.5412C38.0282 35.0375 38.8205 35.3059 39.635 35.3059H51.0575C51.8071 35.306 52.5396 35.0788 53.1603 34.6534C53.7811 34.228 54.2616 33.6241 54.54 32.9196L58.225 23.5919C58.3765 23.208 58.4328 22.7925 58.389 22.3816C58.3452 21.9706 58.2026 21.5768 57.9737 21.2345C57.7448 20.8922 57.4366 20.6119 57.076 20.4181C56.7154 20.2242 56.3133 20.1227 55.905 20.1224H35.12L34.4675 17.8145C34.2438 17.0219 33.7713 16.3245 33.1214 15.8278C32.4714 15.3311 31.6794 15.062 30.865 15.0613H30.25ZM40.25 45.4282C40.7425 45.4282 41.2301 45.33 41.6851 45.1393C42.14 44.9485 42.5534 44.6689 42.9016 44.3164C43.2499 43.964 43.5261 43.5455 43.7145 43.085C43.903 42.6244 44 42.1308 44 41.6324C44 41.1339 43.903 40.6403 43.7145 40.1797C43.5261 39.7192 43.2499 39.3008 42.9016 38.9483C42.5534 38.5958 42.14 38.3162 41.6851 38.1254C41.2301 37.9347 40.7425 37.8365 40.25 37.8365C39.2554 37.8365 38.3016 38.2364 37.5983 38.9483C36.8951 39.6601 36.5 40.6256 36.5 41.6324C36.5 42.6391 36.8951 43.6046 37.5983 44.3164C38.3016 45.0283 39.2554 45.4282 40.25 45.4282ZM50.25 45.4282C50.7425 45.4282 51.2301 45.33 51.6851 45.1393C52.14 44.9485 52.5534 44.6689 52.9016 44.3164C53.2499 43.964 53.5261 43.5455 53.7145 43.085C53.903 42.6244 54 42.1308 54 41.6324C54 41.1339 53.903 40.6403 53.7145 40.1797C53.5261 39.7192 53.2499 39.3008 52.9016 38.9483C52.5534 38.5958 52.14 38.3162 51.6851 38.1254C51.2301 37.9347 50.7425 37.8365 50.25 37.8365C49.2554 37.8365 48.3016 38.2364 47.5983 38.9483C46.8951 39.6601 46.5 40.6256 46.5 41.6324C46.5 42.6391 46.8951 43.6046 47.5983 44.3164C48.3016 45.0283 49.2554 45.4282 50.25 45.4282Z"
                                fill="#FEFEFE" />
                            <path
                                d="M12.864 53.8465C13.0027 53.7932 13.1733 53.7398 13.376 53.6865C13.5787 53.6332 13.7973 53.5852 14.032 53.5425C14.2667 53.4998 14.512 53.4678 14.768 53.4465C15.0347 53.4145 15.3013 53.3985 15.568 53.3985C16.0267 53.3985 16.464 53.4412 16.88 53.5265C17.296 53.6118 17.6587 53.7505 17.968 53.9425C18.2773 54.1345 18.5227 54.3798 18.704 54.6785C18.896 54.9772 18.992 55.3345 18.992 55.7505C18.992 56.1985 18.8693 56.5772 18.624 56.8865C18.3787 57.1958 18.096 57.4252 17.776 57.5745C18.256 57.7558 18.624 58.0225 18.88 58.3745C19.136 58.7265 19.264 59.1745 19.264 59.7185C19.264 60.1558 19.168 60.5292 18.976 60.8385C18.7947 61.1478 18.5387 61.4038 18.208 61.6065C17.888 61.7985 17.5093 61.9372 17.072 62.0225C16.6347 62.1185 16.16 62.1665 15.648 62.1665C15.0293 62.1665 14.4533 62.1132 13.92 62.0065C13.3867 61.9105 12.9653 61.7932 12.656 61.6545L12.992 60.0865C13.1947 60.1718 13.52 60.2732 13.968 60.3905C14.416 60.4972 14.944 60.5505 15.552 60.5505C16.7253 60.5505 17.312 60.2092 17.312 59.5265C17.312 59.2812 17.2587 59.0838 17.152 58.9345C17.0453 58.7852 16.912 58.6732 16.752 58.5985C16.592 58.5132 16.4107 58.4598 16.208 58.4385C16.0053 58.4065 15.808 58.3905 15.616 58.3905H14.016V56.9505H15.6C15.9947 56.9505 16.3307 56.8812 16.608 56.7425C16.896 56.5932 17.04 56.3372 17.04 55.9745C17.04 55.6758 16.9013 55.4412 16.624 55.2705C16.3573 55.0892 15.9787 54.9985 15.488 54.9985C15.2747 54.9985 15.056 55.0145 14.832 55.0465C14.608 55.0678 14.3893 55.0998 14.176 55.1425C13.9733 55.1852 13.7867 55.2332 13.616 55.2865C13.4453 55.3292 13.312 55.3718 13.216 55.4145L12.864 53.8465ZM24.176 60.5985C24.7733 60.5985 25.2267 60.5665 25.536 60.5025V58.3585C25.4293 58.3265 25.2747 58.2945 25.072 58.2625C24.8693 58.2305 24.6453 58.2145 24.4 58.2145C24.1867 58.2145 23.968 58.2305 23.744 58.2625C23.5307 58.2945 23.3333 58.3532 23.152 58.4385C22.9813 58.5238 22.8427 58.6465 22.736 58.8065C22.6293 58.9558 22.576 59.1478 22.576 59.3825C22.576 59.8412 22.72 60.1612 23.008 60.3425C23.296 60.5132 23.6853 60.5985 24.176 60.5985ZM24.016 53.3825C24.656 53.3825 25.1947 53.4625 25.632 53.6225C26.0693 53.7825 26.416 54.0065 26.672 54.2945C26.9387 54.5825 27.1253 54.9345 27.232 55.3505C27.3493 55.7558 27.408 56.2038 27.408 56.6945V61.7665C27.1093 61.8305 26.656 61.9052 26.048 61.9905C25.4507 62.0865 24.7733 62.1345 24.016 62.1345C23.5147 62.1345 23.056 62.0865 22.64 61.9905C22.224 61.8945 21.8667 61.7398 21.568 61.5265C21.28 61.3132 21.0507 61.0358 20.88 60.6945C20.72 60.3532 20.64 59.9318 20.64 59.4305C20.64 58.9505 20.7307 58.5452 20.912 58.2145C21.104 57.8838 21.36 57.6172 21.68 57.4145C22 57.2012 22.368 57.0518 22.784 56.9665C23.2107 56.8705 23.6533 56.8225 24.112 56.8225C24.3253 56.8225 24.5493 56.8385 24.784 56.8705C25.0187 56.8918 25.2693 56.9345 25.536 56.9985V56.6785C25.536 56.4545 25.5093 56.2412 25.456 56.0385C25.4027 55.8358 25.3067 55.6598 25.168 55.5105C25.04 55.3505 24.864 55.2278 24.64 55.1425C24.4267 55.0572 24.1547 55.0145 23.824 55.0145C23.376 55.0145 22.9653 55.0465 22.592 55.1105C22.2187 55.1745 21.9147 55.2492 21.68 55.3345L21.44 53.7665C21.6853 53.6812 22.0427 53.5958 22.512 53.5105C22.9813 53.4252 23.4827 53.3825 24.016 53.3825ZM31.7149 56.9505C31.9602 56.7052 32.2269 56.4332 32.5149 56.1345C32.8029 55.8252 33.0855 55.5158 33.3629 55.2065C33.6509 54.8972 33.9229 54.6038 34.1789 54.3265C34.4349 54.0385 34.6482 53.7932 34.8189 53.5905H37.0909C36.8562 53.8678 36.5842 54.1718 36.2749 54.5025C35.9762 54.8332 35.6615 55.1745 35.3309 55.5265C35.0109 55.8678 34.6909 56.2038 34.3709 56.5345C34.0615 56.8545 33.7789 57.1425 33.5229 57.3985C33.8535 57.6758 34.1949 58.0012 34.5469 58.3745C34.9095 58.7372 35.2615 59.1265 35.6029 59.5425C35.9549 59.9478 36.2802 60.3638 36.5789 60.7905C36.8775 61.2065 37.1282 61.5958 37.3309 61.9585H35.0909C34.8882 61.6385 34.6482 61.3025 34.3709 60.9505C34.1042 60.5985 33.8215 60.2572 33.5229 59.9265C33.2242 59.5852 32.9202 59.2652 32.6109 58.9665C32.3015 58.6678 32.0029 58.4118 31.7149 58.1985V61.9585H29.7789V53.5905H31.7149V56.9505ZM41.676 60.5985C42.2733 60.5985 42.7267 60.5665 43.036 60.5025V58.3585C42.9293 58.3265 42.7747 58.2945 42.572 58.2625C42.3693 58.2305 42.1453 58.2145 41.9 58.2145C41.6867 58.2145 41.468 58.2305 41.244 58.2625C41.0307 58.2945 40.8333 58.3532 40.652 58.4385C40.4813 58.5238 40.3427 58.6465 40.236 58.8065C40.1293 58.9558 40.076 59.1478 40.076 59.3825C40.076 59.8412 40.22 60.1612 40.508 60.3425C40.796 60.5132 41.1853 60.5985 41.676 60.5985ZM41.516 53.3825C42.156 53.3825 42.6947 53.4625 43.132 53.6225C43.5693 53.7825 43.916 54.0065 44.172 54.2945C44.4387 54.5825 44.6253 54.9345 44.732 55.3505C44.8493 55.7558 44.908 56.2038 44.908 56.6945V61.7665C44.6093 61.8305 44.156 61.9052 43.548 61.9905C42.9507 62.0865 42.2733 62.1345 41.516 62.1345C41.0147 62.1345 40.556 62.0865 40.14 61.9905C39.724 61.8945 39.3667 61.7398 39.068 61.5265C38.78 61.3132 38.5507 61.0358 38.38 60.6945C38.22 60.3532 38.14 59.9318 38.14 59.4305C38.14 58.9505 38.2307 58.5452 38.412 58.2145C38.604 57.8838 38.86 57.6172 39.18 57.4145C39.5 57.2012 39.868 57.0518 40.284 56.9665C40.7107 56.8705 41.1533 56.8225 41.612 56.8225C41.8253 56.8225 42.0493 56.8385 42.284 56.8705C42.5187 56.8918 42.7693 56.9345 43.036 56.9985V56.6785C43.036 56.4545 43.0093 56.2412 42.956 56.0385C42.9027 55.8358 42.8067 55.6598 42.668 55.5105C42.54 55.3505 42.364 55.2278 42.14 55.1425C41.9267 55.0572 41.6547 55.0145 41.324 55.0145C40.876 55.0145 40.4653 55.0465 40.092 55.1105C39.7187 55.1745 39.4147 55.2492 39.18 55.3345L38.94 53.7665C39.1853 53.6812 39.5427 53.5958 40.012 53.5105C40.4813 53.4252 40.9827 53.3825 41.516 53.3825ZM46.9109 53.8465C47.0495 53.7932 47.2202 53.7398 47.4229 53.6865C47.6255 53.6332 47.8442 53.5852 48.0789 53.5425C48.3135 53.4998 48.5589 53.4678 48.8149 53.4465C49.0815 53.4145 49.3482 53.3985 49.6149 53.3985C50.0735 53.3985 50.5109 53.4412 50.9269 53.5265C51.3429 53.6118 51.7055 53.7505 52.0149 53.9425C52.3242 54.1345 52.5695 54.3798 52.7509 54.6785C52.9429 54.9772 53.0389 55.3345 53.0389 55.7505C53.0389 56.1985 52.9162 56.5772 52.6709 56.8865C52.4255 57.1958 52.1429 57.4252 51.8229 57.5745C52.3029 57.7558 52.6709 58.0225 52.9269 58.3745C53.1829 58.7265 53.3109 59.1745 53.3109 59.7185C53.3109 60.1558 53.2149 60.5292 53.0229 60.8385C52.8415 61.1478 52.5855 61.4038 52.2549 61.6065C51.9349 61.7985 51.5562 61.9372 51.1189 62.0225C50.6815 62.1185 50.2069 62.1665 49.6949 62.1665C49.0762 62.1665 48.5002 62.1132 47.9669 62.0065C47.4335 61.9105 47.0122 61.7932 46.7029 61.6545L47.0389 60.0865C47.2415 60.1718 47.5669 60.2732 48.0149 60.3905C48.4629 60.4972 48.9909 60.5505 49.5989 60.5505C50.7722 60.5505 51.3589 60.2092 51.3589 59.5265C51.3589 59.2812 51.3055 59.0838 51.1989 58.9345C51.0922 58.7852 50.9589 58.6732 50.7989 58.5985C50.6389 58.5132 50.4575 58.4598 50.2549 58.4385C50.0522 58.4065 49.8549 58.3905 49.6629 58.3905H48.0629V56.9505H49.6469C50.0415 56.9505 50.3775 56.8812 50.6549 56.7425C50.9429 56.5932 51.0869 56.3372 51.0869 55.9745C51.0869 55.6758 50.9482 55.4412 50.6709 55.2705C50.4042 55.0892 50.0255 54.9985 49.5349 54.9985C49.3215 54.9985 49.1029 55.0145 48.8789 55.0465C48.6549 55.0678 48.4362 55.0998 48.2229 55.1425C48.0202 55.1852 47.8335 55.2332 47.6629 55.2865C47.4922 55.3292 47.3589 55.3718 47.2629 55.4145L46.9109 53.8465ZM58.2229 60.5985C58.8202 60.5985 59.2735 60.5665 59.5829 60.5025V58.3585C59.4762 58.3265 59.3215 58.2945 59.1189 58.2625C58.9162 58.2305 58.6922 58.2145 58.4469 58.2145C58.2335 58.2145 58.0149 58.2305 57.7909 58.2625C57.5775 58.2945 57.3802 58.3532 57.1989 58.4385C57.0282 58.5238 56.8895 58.6465 56.7829 58.8065C56.6762 58.9558 56.6229 59.1478 56.6229 59.3825C56.6229 59.8412 56.7669 60.1612 57.0549 60.3425C57.3429 60.5132 57.7322 60.5985 58.2229 60.5985ZM58.0629 53.3825C58.7029 53.3825 59.2415 53.4625 59.6789 53.6225C60.1162 53.7825 60.4629 54.0065 60.7189 54.2945C60.9855 54.5825 61.1722 54.9345 61.2789 55.3505C61.3962 55.7558 61.4549 56.2038 61.4549 56.6945V61.7665C61.1562 61.8305 60.7029 61.9052 60.0949 61.9905C59.4975 62.0865 58.8202 62.1345 58.0629 62.1345C57.5615 62.1345 57.1029 62.0865 56.6869 61.9905C56.2709 61.8945 55.9135 61.7398 55.6149 61.5265C55.3269 61.3132 55.0975 61.0358 54.9269 60.6945C54.7669 60.3532 54.6869 59.9318 54.6869 59.4305C54.6869 58.9505 54.7775 58.5452 54.9589 58.2145C55.1509 57.8838 55.4069 57.6172 55.7269 57.4145C56.0469 57.2012 56.4149 57.0518 56.8309 56.9665C57.2575 56.8705 57.7002 56.8225 58.1589 56.8225C58.3722 56.8225 58.5962 56.8385 58.8309 56.8705C59.0655 56.8918 59.3162 56.9345 59.5829 56.9985V56.6785C59.5829 56.4545 59.5562 56.2412 59.5029 56.0385C59.4495 55.8358 59.3535 55.6598 59.2149 55.5105C59.0869 55.3505 58.9109 55.2278 58.6869 55.1425C58.4735 55.0572 58.2015 55.0145 57.8709 55.0145C57.4229 55.0145 57.0122 55.0465 56.6389 55.1105C56.2655 55.1745 55.9615 55.2492 55.7269 55.3345L55.4869 53.7665C55.7322 53.6812 56.0895 53.5958 56.5589 53.5105C57.0282 53.4252 57.5295 53.3825 58.0629 53.3825ZM70.1298 55.2065H67.4258V61.9585H65.4898V55.2065H62.8018V53.5905H70.1298V55.2065ZM73.5118 56.6785C73.6718 56.6358 73.9064 56.5985 74.2158 56.5665C74.5251 56.5345 74.8344 56.5185 75.1438 56.5185C75.6238 56.5185 76.0718 56.5718 76.4878 56.6785C76.9144 56.7852 77.2824 56.9558 77.5918 57.1905C77.9011 57.4145 78.1464 57.7078 78.3278 58.0705C78.5091 58.4225 78.5998 58.8438 78.5998 59.3345C78.5998 59.8358 78.5144 60.2625 78.3438 60.6145C78.1731 60.9665 77.9278 61.2545 77.6078 61.4785C77.2878 61.7025 76.9038 61.8678 76.4558 61.9745C76.0184 62.0812 75.5278 62.1345 74.9838 62.1345C74.3544 62.1345 73.7678 62.1025 73.2238 62.0385C72.6798 61.9745 72.1304 61.8785 71.5758 61.7505V53.5905H73.5118V56.6785ZM74.9358 60.6145C75.4798 60.6145 75.9011 60.5132 76.1998 60.3105C76.5091 60.0972 76.6638 59.7612 76.6638 59.3025C76.6638 59.0678 76.6104 58.8705 76.5038 58.7105C76.4078 58.5505 76.2744 58.4225 76.1038 58.3265C75.9438 58.2198 75.7518 58.1452 75.5278 58.1025C75.3038 58.0598 75.0691 58.0385 74.8238 58.0385C74.5998 58.0385 74.3651 58.0492 74.1198 58.0705C73.8744 58.0812 73.6718 58.1078 73.5118 58.1505V60.5345C73.6504 60.5558 73.8531 60.5772 74.1198 60.5985C74.3971 60.6092 74.6691 60.6145 74.9358 60.6145Z"
                                fill="#FEFEFE" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1395_12546">
                                <rect width="89" height="83" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
    `;

    const secondSvgContainer = document.createElement('div');
    secondSvgContainer.classList.add('svg-container');
    // Add SVG content here for the second button
    secondSvgContainer.innerHTML = `
                       <svg width="79" height="72" viewBox="0 0 79 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M73.4376 0H4.68759C3.44439 0 2.2521 0.49386 1.37303 1.37294C0.49395 2.25201 8.96351e-05 3.4443 8.96351e-05 4.6875V67.1875C-0.00546213 68.0813 0.246991 68.9577 0.727158 69.7115C1.20732 70.4654 1.89481 71.0647 2.70712 71.4375C3.32812 71.7241 4.00365 71.8733 4.68759 71.875C5.78825 71.8741 6.85281 71.4823 7.69149 70.7695L7.71493 70.7461L20.2696 59.7422C20.5548 59.5021 20.9164 59.3719 21.2892 59.375H73.4376C74.6808 59.375 75.8731 58.8811 76.7522 58.0021C77.6312 57.123 78.1251 55.9307 78.1251 54.6875V4.6875C78.1251 3.4443 77.6312 2.25201 76.7522 1.37294C75.8731 0.49386 74.6808 0 73.4376 0ZM75.0001 54.6875C75.0001 55.1019 74.8355 55.4993 74.5424 55.7924C74.2494 56.0854 73.852 56.25 73.4376 56.25H21.2892C20.1744 56.2532 19.0966 56.6502 18.2462 57.3711L5.68368 68.3867C5.45553 68.5755 5.17844 68.6956 4.88468 68.7329C4.59092 68.7703 4.29259 68.7234 4.02446 68.5977C3.75633 68.472 3.52943 68.2727 3.3702 68.0231C3.21097 67.7734 3.12596 67.4836 3.12509 67.1875V4.6875C3.12509 4.2731 3.28971 3.87567 3.58274 3.58265C3.87576 3.28962 4.27319 3.125 4.68759 3.125H73.4376C73.852 3.125 74.2494 3.28962 74.5424 3.58265C74.8355 3.87567 75.0001 4.2731 75.0001 4.6875V54.6875ZM53.1251 23.4375C53.1251 23.8519 52.9605 24.2493 52.6674 24.5424C52.3744 24.8354 51.977 25 51.5626 25H26.5626C26.1482 25 25.7508 24.8354 25.4577 24.5424C25.1647 24.2493 25.0001 23.8519 25.0001 23.4375C25.0001 23.0231 25.1647 22.6257 25.4577 22.3326C25.7508 22.0396 26.1482 21.875 26.5626 21.875H51.5626C51.977 21.875 52.3744 22.0396 52.6674 22.3326C52.9605 22.6257 53.1251 23.0231 53.1251 23.4375ZM53.1251 35.9375C53.1251 36.3519 52.9605 36.7493 52.6674 37.0424C52.3744 37.3354 51.977 37.5 51.5626 37.5H26.5626C26.1482 37.5 25.7508 37.3354 25.4577 37.0424C25.1647 36.7493 25.0001 36.3519 25.0001 35.9375C25.0001 35.5231 25.1647 35.1257 25.4577 34.8326C25.7508 34.5396 26.1482 34.375 26.5626 34.375H51.5626C51.977 34.375 52.3744 34.5396 52.6674 34.8326C52.9605 35.1257 53.1251 35.5231 53.1251 35.9375Z"
                            fill="white" />
                    </svg>
    `;

    buttonSection.appendChild(firstSvgContainer);
    buttonSection.appendChild(secondSvgContainer);

    return buttonSection;
}






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


                    // adding 2 buttons (cart and chat) into 3rd row of the grid
                    const buttonSection = createButtonSection();
                    productInfoDesktopSection.appendChild(buttonSection);



                    const gridWrapper = document.createElement("div");
                    gridWrapper.classList.add('description-grid-wrapper');

                    const imgDesktop = document.createElement('img');
                    imgDesktop.src = product.productImage;

                    const dDescriptionDiv = createDescriptionDiv(product.properties);





                    gridWrapper.appendChild(imgDesktop);
                    gridWrapper.appendChild(dDescriptionDiv);



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