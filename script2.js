// Variables and initial setup
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCart = document.querySelector('.listCart');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

// Event Listeners
openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

// Products Data
let products = [
    /* Ramen */
    { id: 1, name: 'Shoyu Ramen', image: 'pictures/best_sell1.png', price: 275 },
    { id: 2, name: 'Tonkotsu Ramen', image: 'pictures/best_sell2.png', price: 265 },
    /* Katsu */
    { id: 41, name: ' Katsu Kare-Kare', image: 'pictures/25.png', price: 195 },
    { id: 42, name: 'Katsu Ala King', image: 'pictures/26.png', price: 190 },
    { id: 43, name: 'Katsu Pamagiana', image: 'pictures/27.png', price: 195 },
    { id: 44, name: 'Katsu Spring Rolls', image: 'pictures/28.png', price: 215 },
    /* Taiyaki */
    { id: 5, name: 'Custard 2PCS', image: 'pictures/12.png', price: 50 },
    { id: 6, name: 'Custard Half Dozen', image: 'pictures/12.png', price: 145 },
    { id: 7, name: 'Red Bean 2PCS', image: 'pictures/13.png', price: 50 },
    { id: 8, name: 'Red Bean Half Dozen', image: 'pictures/13.png', price: 145 },
    { id: 9, name: 'Chocolate 2PCS', image: 'pictures/14.png', price: 50 },
    { id: 10, name: 'Chocolate Half Dozen', image: 'pictures/14.png', price: 145 },
    { id: 11, name: 'Matcha Cream 2PCS', image: 'pictures/15.png', price: 50 },
    { id: 12, name: 'Matcha Cream Half Dozen', image: 'pictures/15.png', price: 145 },
    { id: 13, name: 'Cream Cheese 2PCS', image: 'pictures/16.png', price: 60 },
    { id: 14, name: 'Cream Cheese Half Dozen', image: 'pictures/16.png', price: 165 },
    { id: 15, name: 'Oreo 2PCS', image: 'pictures/17.png', price: 60 },
    { id: 16, name: 'Oreo Half Dozen', image: 'pictures/17.png', price: 165 },
    { id: 17, name: 'Ube Cheese 2PCS', image: 'pictures/18.png', price: 60 },
    { id: 18, name: 'Ube Cheese Half Dozen', image: 'pictures/18.png', price: 165 },
    { id: 19, name: 'Sausage 2PCS', image: 'pictures/19.png', price: 80 },
    { id: 20, name: 'Sausage Half Dozen', image: 'pictures/19.png', price: 235 },
    { id: 21, name: 'Ham & Cheese 2PCS', image: 'pictures/20.png', price: 80 },
    { id: 22, name: 'Ham & Cheeses Half Dozen', image: 'pictures/20.png', price: 235 },
    { id: 23, name: 'Chili Crab & Cheese 2PCS', image: 'pictures/22.png', price: 80 },
    { id: 24, name: 'Chili Crab Cheese<br>Half Dozen', image: 'pictures/22.png', price: 235 },
    { id: 25, name: 'Bacon & Maple 2PCS', image: 'pictures/23.png', price: 80 },
    { id: 26, name: 'Bacon & Maple Half Dozen', image: 'pictures/23.png', price: 235 },
    { id: 27, name: 'Cheesy Bacon 2PCS', image: 'pictures/24.png', price: 80 },
    { id: 28, name: 'Cheesy Bacon Half Dozen', image: 'pictures/24.png', price: 235 },
    /* Yogurt */
    { id: 29, name: 'Peach Mango', image: 'pictures/best_sell3.png', price: 95 },
    { id: 30, name: 'Muscuvado Pearl', image: 'pictures/new1.jpg', price: 95 },
    { id: 31, name: 'Fresh Lemonade', image: 'pictures/new2.jpg', price: 75 },
    /* Milk & Coffee */
    { id: 32, name: 'Blueberry', image: 'pictures/new3.jpg', price: 95 },
    { id: 33, name: 'Matcha Milk', image: 'pictures/p6.jpg', price: 85 },
    { id: 34, name: 'Strawberry', image: 'pictures/new5.jpg', price: 85 },
    { id: 35, name: 'Choco Milk', image: 'pictures/best_sell4.png', price: 75 },
    { id: 36, name: 'Mocha Coffee', image: 'pictures/p11.jpg', price: 65 },
    /* Strawberry Series */
    { id: 37, name: 'Matcha Milk Strawberry', image: 'pictures/8.png', price: 145 },
    { id: 38, name: 'Strawberry Banana Yogurt', image: 'pictures/10.png', price: 135 },
    { id: 39, name: 'Milk Strawberry Pearls', image: 'pictures/9.png', price: 135 },
    { id: 40, name: 'Mocha Coffee', image: 'pictures/11.png', price: 140 },
];

// Cart setup
let listCarts = [];

// Initialize App
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}"/>
            <div class="title">${value.name}</div>
            <div class="price">₱${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>
        `;
        list.appendChild(newDiv);
    });
}

initApp();

// Add to Cart Function
function addToCart(key) {
    if (listCarts[key] == null) {
        listCarts[key] = { ...products[key], quantity: 1 }; // Add product with quantity
    } else {
        listCarts[key].quantity++; // Increment quantity if product already exists
    }
    reloadCart();
    displayNotification("Item added to cart");
}

// Reload Cart Function
function reloadCart() {
    listCart.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCarts.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price * value.quantity;
            count += value.quantity;
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div>${value.name}</div>
                <div>₱${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <span class="count">${value.quantity}</span>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `;
            listCart.appendChild(newDiv);
        }
    });
    total.innerText = `₱${totalPrice.toLocaleString()}`;
    quantity.innerText = count;
    
    // Enable or disable the checkout button
    let checkoutButton = document.querySelector('.cart .checkOut div:nth-child(2)');
    if (count > 0) {
        checkoutButton.classList.remove('disabled');
        checkoutButton.addEventListener('click', redirectToCheckout);
    } else {
        checkoutButton.classList.add('disabled');
        checkoutButton.removeEventListener('click', redirectToCheckout);
    }
}

// Change Quantity Function
function changeQuantity(key, newQuantity) {
    if (newQuantity >= 0) {
        listCarts[key].quantity = newQuantity;
        if (newQuantity === 0) {
            delete listCarts[key]; // Remove product if quantity is zero
        }
    }
    reloadCart();
}

// Redirect to Checkout Function
function redirectToCheckout() {
    if (quantity.innerText === '0') {
        displayErrorMessage("No items in the cart");
    } else {
        window.location.href = 'index1.html';
    }
}

// Redirect to Main Function
function redirectToMain() {
    window.location.href = 'index.html'; 
}

// Display Notification Function
function displayNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Display Error Message Function
function displayErrorMessage(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.classList.add('show');

    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 3000);
}
