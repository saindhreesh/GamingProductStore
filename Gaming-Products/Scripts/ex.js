document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const signinbtn = document.querySelector('.signin-btn');
    const username = document.querySelector('.username');
    const storedUsername = localStorage.getItem('username');
    const wishlistContainer = document.querySelector('.wishlist-product');
    const wishlistCount = document.getElementById('cart-item-no');
    const heartButtons = document.querySelectorAll('.heart-button');
    const buyNowButtons = document.querySelectorAll('.bunow-para');
    const filterBar = document.getElementById('filter-show');
    const searchButton = document.getElementById('search-button');
    const slider = document.getElementById('slider');
    const resultCountSpan = document.querySelector('.showing-result');
    const showResults = document.querySelector('.show-results');
    const productCards = document.querySelectorAll('.product-card');
    const noProductMessage = document.querySelector('.no-product');
    let count = 0;

    // Initialize username
    if (storedUsername) {
        username.textContent = storedUsername;
    }

    // Sign-in button logic
    if (username.textContent.trim().toLowerCase() === 'guest') {
        signinbtn.style.display = 'block';
        signinbtn.addEventListener('click', () => {
            window.location.href = './Gaming-Products/Pages/login.html';
        });
    } else {
        signinbtn.style.display = 'none';
    }

    // Wishlist functionality
    heartButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card');
            const productImage = productCard.querySelector('img').src;
            const productName = productCard.querySelector('h4').textContent;
            const productPrice = productCard.querySelector('p').textContent;

            if (button.style.color === 'red') {
                // Remove from wishlist
                button.style.color = '';
                count--;
                wishlistCount.textContent = count;

                const items = wishlistContainer.querySelectorAll('.wishlist-item-card');
                items.forEach((item) => {
                    if (item.querySelector('h4').textContent === productName) {
                        wishlistContainer.removeChild(item);
                    }
                });

                if (count === 0) {
                    document.querySelector('.wishlist-item').style.display = 'none';
                    document.body.style.backgroundColor = 'black';
                }
            } else {
                // Add to wishlist
                button.style.color = 'red';
                count++;
                wishlistCount.textContent = count;

                const wishlistItem = document.createElement('div');
                wishlistItem.classList.add('wishlist-item-card');
                wishlistItem.innerHTML = `
                    <img src="${productImage}" alt="${productName}">
                    <h4>${productName}</h4>
                    <p>${productPrice}</p>
                    <button class=" bunow-para">BuyNow</button>
                    <button class="remove-btn">Remove</button>
                `;
                wishlistContainer.appendChild(wishlistItem);

                wishlistItem.querySelector('.remove-btn').addEventListener('click', () => {
                    wishlistContainer.removeChild(wishlistItem);
                    count--;
                    wishlistCount.textContent = count;
                    button.style.color = '';

                    if (count === 0) {
                        document.querySelector('.wishlist-item').style.display = 'none';
                        document.body.style.backgroundColor = 'black';
                    }
                });

                document.querySelector('.wishlist-item').style.display = 'block';
            }
        });
    });

    // Add event listener for wishlist Buy Now buttons
    wishlistContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('buynow-btn')) {
            const productCard = event.target.closest('.wishlist-item-card');
            const product = {
                image: productCard.querySelector('img').src,
                name: productCard.querySelector('h4').textContent,
                price: productCard.querySelector('p').textContent.replace('$', '')
            };

            // Save the selected product to localStorage
            localStorage.setItem('selectedProduct', JSON.stringify(product));

            // Redirect to the Buy Now page
            window.location.href = './Gaming-Products/Pages/buynow.html';
        }
    });

    // Buy Now button logic
    buyNowButtons.forEach((button) => {
        
        button.addEventListener('click', (e) => {
            if (username.textContent.toLowerCase() === 'guest') {
          alert('Guest user cannot access the Buynow page. Please sign in.');
          e.preventDefault();
          window.location.href = './Gaming-Products/Pages/login.html';
        } else {
             const productCard = button.closest('.product-card'); // Get the parent product card
            const product = {
                image: productCard.querySelector('img').src,
                name: productCard.querySelector('h4').textContent,
                price: productCard.querySelector('p').textContent.replace('$', '')
            };

            // Save the selected product to localStorage
            localStorage.setItem('selectedProduct', JSON.stringify(product));

            // Redirect to the Buy Now page
            window.location.href = './Gaming-Products/Pages/buynow.html';
        }
           
        });
    }); // Close buyNowButtons.forEach

    // Filter functionality
    filterBar.addEventListener('click', () => {
        const sidebar = document.querySelector('.sidebar');
        const currentDisplay = window.getComputedStyle(sidebar).display;

        if (currentDisplay === 'none') {
            sidebar.style.display = 'block';
            filterBar.textContent = 'Cancel';
        } else {
            sidebar.style.display = 'none';
            filterBar.textContent = 'Filter';
            showResults.style.display = 'none';
        }
    });

    // Search functionality
    searchButton.addEventListener('click', () => {
        const searchValue = document.getElementById('search-value').value.toLowerCase();
        let resultCount = 0;

        productCards.forEach((card) => {
            const productName = card.querySelector('h4').textContent.toLowerCase();
            if (productName.includes(searchValue)) {
                card.style.display = 'block';
                resultCount++;
            } else {
                card.style.display = 'none';
            }
        });

        resultCountSpan.textContent = resultCount;
        noProductMessage.style.display = resultCount > 0 ? 'none' : 'block';
        showResults.style.display = resultCount > 0 ? 'block' : 'none';
    });

    // Price range filter
    slider.addEventListener('input', () => {
        const sliderValue = parseInt(slider.value);
        document.getElementById('current-value').textContent = sliderValue;
        let resultCount = 0;

        productCards.forEach((card) => {
            const productPrice = parseInt(card.querySelector('p').textContent.replace('$', ''));
            if (productPrice <= sliderValue) {
                card.style.display = 'block';
                resultCount++;
            } else {
                card.style.display = 'none';
            }
        });

        resultCountSpan.textContent = resultCount;
        noProductMessage.style.display = resultCount > 0 ? 'none' : 'block';
        showResults.style.display = resultCount > 0 ? 'block' : 'none';
    });

   
}); // Close DOMContentLoaded event listener