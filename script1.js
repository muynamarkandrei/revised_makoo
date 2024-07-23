document.addEventListener("DOMContentLoaded", function() {
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    const dropdownMenu = document.querySelector("#dropdown .menu");
    const selectedPaymentModeInput = document.getElementById('selectedPaymentMode');
    const placeOrderButton = document.getElementById('placeOrderButton');
    const modal = document.getElementById('thankYouModal');

    // Function to update dropdown toggle content
    function updateDropdownToggleContent(content) {
        dropdownToggle.innerHTML = `${content} <i class="fas fa-caret-down"></i>`;
    }

    // Add event listener for mouse enter on dropdown toggle
    dropdownToggle.addEventListener("mouseenter", () => {
        dropdownMenu.style.display = 'block';
    });

    // Add event listener for mouse leave on dropdown toggle
    dropdownToggle.addEventListener("mouseleave", () => {
        dropdownMenu.style.display = 'none';
    });

    // Add event listener for mouse enter on dropdown menu
    dropdownMenu.addEventListener("mouseenter", () => {
        dropdownMenu.style.display = 'block';
    });

    // Add event listener for mouse leave on dropdown menu
    dropdownMenu.addEventListener("mouseleave", () => {
        dropdownMenu.style.display = 'none';
    });

    // Function to handle submenu item click
    function handleSubmenuItemClicked(item) {
        updateDropdownToggleContent(`${item.parentNode.previousElementSibling.textContent} - ${item.textContent}`);
        dropdownMenu.style.display = 'none';
        selectedPaymentModeInput.value = item.textContent;
    }

    // Add event listener for click on main dropdown items
    const mainDropdownItems = document.querySelectorAll(".menu-item:not(.dropdown)");
    mainDropdownItems.forEach(item => {
        item.addEventListener("click", () => {
            if (item.classList.contains('submenu-item')) {
                handleSubmenuItemClicked(item);
            } else {
                updateDropdownToggleContent(item.textContent);
                dropdownMenu.style.display = 'none';
                selectedPaymentModeInput.value = item.textContent; // Set the hidden input value
            }
        });
    });

    // Add event listener for mouse enter on main dropdown items
    const mainDropdownParentItems = document.querySelectorAll(".dropdown");
    mainDropdownParentItems.forEach(parentItem => {
        const submenu = parentItem.querySelector('.submenu');
        parentItem.addEventListener("mouseenter", () => {
            submenu.style.display = 'block';
        });
        parentItem.addEventListener("mouseleave", () => {
            submenu.style.display = 'none';
        });
    });

    // Add event listener for click on submenu items
    const submenuItems = document.querySelectorAll(".submenu-item");
    submenuItems.forEach(subitem => {
        subitem.addEventListener("click", (event) => {
            event.preventDefault();
            handleSubmenuItemClicked(subitem);
        });
    });

    // Add event listener for click on the order button
    placeOrderButton.addEventListener('click', (event) => {
        event.preventDefault();
        const inputFields = document.querySelectorAll('input[type="text"], textarea');
        let allFieldsFilled = true;

        inputFields.forEach(input => {
            if (input.value.trim() === '' && input.name !== "comments") {
                allFieldsFilled = false;
            }
        });

        if (allFieldsFilled && selectedPaymentModeInput.value.trim() !== '') {
            modal.style.display = 'flex';
        } else {
            displayNotification("Please fill in all required fields and select a mode of payment.");
        }
    });

    // Function to display notifications
    function displayNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;
        document.body.appendChild(notification);

        // Remove the notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Event listener for clicking outside the modal to close it and redirect
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            window.location.href = "index.html";
        }
    });

    // Add event listener for the cancel button
    const cancelButton = document.querySelector(".cancel-button");
    cancelButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });
})