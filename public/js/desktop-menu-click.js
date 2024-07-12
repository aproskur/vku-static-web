document.addEventListener('DOMContentLoaded', function () {
    // Check if it's desktop version (screen width > 900px)
    if (window.innerWidth >= 900) {
        console.log("Script loaded for desktop");

        const grunt = document.getElementById('grunt');
        console.log("Found element with ID 'grunt':", grunt);

        if (grunt) { // Ensure grunt is not null
            const productDescription = document.querySelector('.d-product-description');
            console.log("Found element with class 'd-product-description':", productDescription);

            grunt.addEventListener('click', function () {
                console.log("CLICK menu");
                console.log("Product description display:", productDescription.style.display);

                // Toggle visibility of product description section
                if (productDescription.style.display === 'grid') {
                    productDescription.style.display = 'none';
                } else {
                    productDescription.style.display = 'grid';
                }
            });

            console.log("Event listener added to 'grunt'");
        } else {
            console.error("Element with ID 'grunt' not found");
        }
    } else {
        console.log("FROM desctop-menu-click: script not loaded: screen width < 900px");
    }
});
