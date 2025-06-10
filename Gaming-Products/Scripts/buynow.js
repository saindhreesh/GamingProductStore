// Retrieve the selected product from localStorage
const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
const productContainer = document.getElementById('selected-product');

// Check if a product is selected
if (selectedProduct) {
    // Display the selected product
    
    const selectedProducts = Array.isArray(selectedProduct) ? selectedProduct : [selectedProduct];

    // Function to update the product container and re-attach event listeners
    function updateProductContainer() {
        productContainer.innerHTML = selectedProducts.map((p, index) => `
            <div class="product-details">
                <img src="${p.image}" alt="${p.name}">
                <h2>${p.name}</h2>
                <p>Price: $${p.price}</p>
                <button class="order-now-btn" data-index="${index}">Order Now</button>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `).join('');

        // Add an overall checkout button if products exist
        if (selectedProducts.length > 0) {
            const checkoutButton = document.createElement('button');
            checkoutButton.id = 'checkout-btn';
            checkoutButton.textContent = 'Checkout All';
            checkoutButton.addEventListener('click', () => {
                const address = prompt('Please enter your delivery address:');

                if (address) {
                    // Recalculate the total price from the updated selectedProducts array
                    const total = selectedProducts.reduce((sum, p) => sum + p.price,0);
                    const productDetails = selectedProducts.map(p => `- ${p.name}: $${p.price}`).join('\n');

                    alert(`Delivery Address: ${address}\n\nProducts:\n${productDetails}\n\nTotal Price: $${total}\n\nOrder Confirmed!`);

                    // Clear the selected products after checkout
                    selectedProducts.length = 0;
                    localStorage.removeItem('selectedProduct');
                    updateProductContainer();
                    alert('The Page Will be Redirect please wait')
                    setInterval(()=>{
                        window.location.href='../../index.html'
                    },2000)
                } else {
                    alert('Checkout cancelled. Address is required to proceed.');
                }
            });
            productContainer.appendChild(checkoutButton);
        }

        // Re-attach event listeners
        attachEventListeners();
    }

    // Attach event listeners for Order Now and Remove buttons
    function attachEventListeners() {
        document.querySelectorAll('.order-now-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                const product = selectedProducts[index];

                // Prompt the user for their address
                const address = prompt(`Please enter your delivery address for ${product.name}:`);

                if (address) {
                    alert(`Product: ${product.name}\nPrice: $${product.price}\nDelivery Address: ${address}\nPayment Method: Cash on Delivery\nOrder Confirmed!`);

                    // Remove the product from the selected products list
                    selectedProducts.splice(index, 1);
                    localStorage.setItem('selectedProduct', JSON.stringify(selectedProducts));

                    // Update the product container
                    updateProductContainer();
                    alert('The Page Will be Redirect please wait')
                    setInterval(()=>{
                        window.location.href='../../index.html'
                    },2000)
                    
                } else {
                    alert('Order cancelled. Address is required to proceed.');
                }
            });
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                selectedProducts.splice(index, 1);
                localStorage.setItem('selectedProduct', JSON.stringify(selectedProducts));

                // Update the product container
                updateProductContainer();
                alert('The Product has Been Removed from your Cart');
                window.location.href='../../index.html'
            });
        });
    }

    // Initial call to update the product container
    updateProductContainer();

    // Display related products based on the selected product's keyword
    const keyword = selectedProducts[0].name.split(' ')[0].toLowerCase();
    const allProducts = [
        { image: '../Images/Nitendo Switch.jpg', name: 'Nintendo Switch', price: 29 },
        { image: '../Images/headphone 1.jpg', name: 'Boat Gaming HeadSet', price: 26 },
        { image: '../Images/key1.jpg', name: 'Asus Gaming Keyboard', price: 50 },
        { image: '../Images/mouse1.jpg', name: 'Zebronics Gaming Mouse', price: 20 },
        { image: '../Images/key3.jpg', name: 'Potronics Gaming Keyboard', price: 40 }
    ];

    const relatedProducts = allProducts.filter(product => product.name.toLowerCase().includes(keyword));
    const relatedProductsContainer = document.getElementById('related-products');
    relatedProductsContainer.innerHTML = '<h3>Related Products</h3>';
    relatedProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('related-product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <p>${product.name} - $${product.price}</p>
            <button class="add-to-cart-btn">Add to Cart</button>
        `;
        relatedProductsContainer.appendChild(productElement);

        // Add event listener for Add to Cart button
        productElement.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            // Retrieve the current selected products from localStorage
            let selectedProducts = JSON.parse(localStorage.getItem('selectedProduct')) || [];

            // Ensure selectedProducts is always an array
            if (!Array.isArray(selectedProducts)) {
                selectedProducts = [selectedProducts];
            }

            // Check if the product is already in the selected products list
            const isProductAlreadyAdded = selectedProducts.some(p => p.name === product.name);
            if (isProductAlreadyAdded) {
                alert(`${product.name} is already in the cart!`);
                return;
            }

            // Add the new product to the selected products list
            selectedProducts.push(product);
            localStorage.setItem('selectedProduct', JSON.stringify(selectedProducts));

            // Append the new product to the displayed selected product details
            const newProductElement = document.createElement('div');
            newProductElement.classList.add('product-details');
            newProductElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Price: $${product.price}</p>
                <button class="order-now-btn" data-index="${selectedProducts.length - 1}">Order Now</button>
                <button class="remove-btn" data-index="${selectedProducts.length - 1}">Remove</button>
            `;

            // Ensure the product is appended correctly even if 'checkout-btn' is missing
            const checkoutButton = document.getElementById('checkout-btn');
            if (checkoutButton) {
                productContainer.insertBefore(newProductElement, checkoutButton);
            } else {
                productContainer.appendChild(newProductElement);
            }

            // Attach event listeners for the new buttons only
            newProductElement.querySelector('.order-now-btn').addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                const product = selectedProducts[index];

                // Prompt the user for their address
                const address = prompt(`Please enter your delivery address for ${product.name}:`);

                if (address) {
                    alert(`Product: ${product.name}\nPrice: $${product.price}\nDelivery Address: ${address}\nPayment Method: Cash on Delivery\nOrder Confirmed!`);

                    // Remove the product from the selected products list
                    selectedProducts.splice(index, 1);
                    localStorage.setItem('selectedProduct', JSON.stringify(selectedProducts));

                    // Update the product container
                    updateProductContainer();
                } else {
                    alert('Order cancelled. Address is required to proceed.');
                }
            });

            newProductElement.querySelector('.remove-btn').addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                selectedProducts.splice(index, 1);
                localStorage.setItem('selectedProduct', JSON.stringify(selectedProducts));

                // Update the product container
                updateProductContainer();
            });

            // Remove the related product from the list
            productElement.remove();

            alert(`${product.name} added to cart!`);
        });
    });
} else {
    // If no product is selected, show a message
    productContainer.innerHTML = '<h1>No product selected. Please go back and select a product.</h1>';
}