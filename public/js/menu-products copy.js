
/*
document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.menu-item');

    // Initially close all menu items
    menuItems.forEach(item => {
        item.classList.add('closed'); // Add 'closed' class initially
        const dropdown = item.querySelector('.dropdown');
        if (dropdown) {
            dropdown.style.display = 'none'; // Hide dropdown initially
        }

        // Add click event listener to toggle classes and dropdown visibility
        item.addEventListener('click', function () {
            this.classList.toggle('opened');
            this.classList.toggle('closed');
            if (dropdown) {
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
}); */


document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.menu-item');

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
                }
            });

            // Toggle the clicked menu item
            this.classList.toggle('opened');
            this.classList.toggle('closed');
            if (dropdown) {
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
});

/*
document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.menu-item');

    // Initially close all menu items
    menuItems.forEach(item => {
        item.classList.add('closed'); // Add 'closed' class initially
        const dropdown = item.querySelector('.dropdown');
        if (dropdown) {
            dropdown.style.display = 'none'; // Hide dropdown initially
        }

        // Add click event listener to toggle classes and dropdown visibility
        item.addEventListener('click', function () {
            this.classList.toggle('opened');
            this.classList.toggle('closed');
            if (dropdown) {
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            }
            adjustPseudoElementPosition(this);
        });
    });

    function adjustPseudoElementPosition(item) {
        const pseudoElement = window.getComputedStyle(item, '::before');
        const height = item.offsetHeight;
        const topValue = height / 2;
        item.style.setProperty('--pseudo-top', `${topValue}px`);
    }

    // Adjust position on initial load
    menuItems.forEach(item => adjustPseudoElementPosition(item));
});
*/
