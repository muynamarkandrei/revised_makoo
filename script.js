document.addEventListener("DOMContentLoaded", function() {
    const overlays = document.querySelectorAll(".container-overlay");

    overlays.forEach(overlay => {
        overlay.addEventListener("click", function() {
            const targetModal = overlay.getAttribute("data-target");
            $(targetModal).modal("show");
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the "Start New Order" button
    document.getElementById('start-order-btn').addEventListener('click', function() {
        // Hide landing page elements
        document.querySelector('header').style.display = 'none';
        document.querySelector('main').style.display = 'none';
        document.querySelector('footer').style.display = 'none';
        
        // Display order form container
        document.querySelector('.container').style.display = 'block';
    });
});

document.getElementById('start-order-btn').addEventListener('click', function() {
    window.location.href = 'index2.html';
});